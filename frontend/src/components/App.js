import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import '../index.css'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup.js'
import api from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DeleteCardPopup from './DeleteCardPopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import authApi from '../utils/Auth'
import InfoTooltip from './InfoTooltip'

export default function App () {
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [isAgreePopupOpen, setIsAgreePopupOpen] = React.useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
  const [cards, setCards] = React.useState([])
  const [selectedCard, setSelectedCard] = React.useState({})
  const [currentUser, setCurrentUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [status, setStatus] = React.useState({ message: '', status: false })
  const [infoTooltipIsOpen, setInfoTooltipIsOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      auth(token)
    }
  }, [])

  function auth (token) {
    authApi
      .getInfo(token)
      .then(() => {
        localStorage.setItem('loggedIn', JSON.stringify(true))
        setLoggedIn(true)
        navigate('/')
      })
      .catch(() => {
        localStorage.setItem('loggedIn', JSON.stringify(false))
      })
  }

  function handleLogin ({ email, password }) {
    localStorage.setItem('email', email)
    setIsLoading(true)
    return authApi
      .authorize(email, password)
      .then(res => {
        if (res.token) {
          setLoggedIn(true)
          localStorage.setItem('jwt', res.token)
          localStorage.setItem('loggedIn', JSON.stringify(true))
          navigate('/')
        }
      })
      .catch(() => {
        setInfoTooltipIsOpen(true)
        setStatus({
          message: 'Неверный логин или пароль',
          status: false
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleRegister ({ email, password }) {
    setIsLoading(true)
    return authApi
      .register(email, password)
      .then(() => {
        setStatus({ message: 'Вы успешно зарегистрировались!', status: true })
        navigate('/sign-in')
      })
      .catch(() => {
        setStatus({
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
          status: false
        })
      })
      .finally(() => {
        setInfoTooltipIsOpen(true)
        setIsLoading(false)
      })
  }

  function onSignOut () {
    localStorage.clear()
    setLoggedIn(false)
  }

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getAllCards()])
        .then(([person, cards]) => {
          setCurrentUser(person)
          setCards(cards)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [loggedIn])

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    if (isLiked) {
      api
        .dislikeCard(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      api
        .likeCard(card._id)
        .then(newCard => {
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  function handleAgreeCardDelete () {
    setIsLoading(true)
    const id = selectedCard._id
    api
      .deleteCard(id)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== id))
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit ({ name, link }) {
    setIsLoading(true)
    api
      .createCard({ nameNewImage: name, linkNewImage: link })
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser ({ name, about }) {
    setIsLoading(true)
    api
      .saveUserChanges({ nameProfile: name, aboutProfile: about })
      .then(res => {
        setCurrentUser(res)
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar ({ avatar }) {
    setIsLoading(true)
    api
      .changeUserAvatar(avatar)
      .then(res => {
        setCurrentUser(res)
        closeAllPopup()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick () {
    setIsEditProfileOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (data) {
    setIsImagePopupOpen(true)
    setSelectedCard(data)
  }

  function handleDeleteClick (data) {
    setSelectedCard(data)
    setIsAgreePopupOpen(true)
  }

  function closeAllPopup () {
    setIsImagePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfileOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsAgreePopupOpen(false)
    setInfoTooltipIsOpen(false)
    setTimeout(() => setSelectedCard({}), 400)
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path='/sign-in'
            element={<Login onLogin={handleLogin} isLoading={isLoading} />}
          />

          <Route
            path='/sign-up'
            element={
              <Register onRegister={handleRegister} isLoading={isLoading} />
            }
          />

          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onDelete={handleDeleteClick}
                  onCardClick={handleCardClick}
                  onCardLikeClick={handleCardLike}
                  cards={cards}
                  email={localStorage.getItem('email')}
                  onSignOut={onSignOut}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path='*'
            element={
              loggedIn ? (
                <Navigate to='/' />
              ) : (
                <Navigate to='/sign-in' />
              )
            }
          />
        </Routes>
        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <DeleteCardPopup
          isOpen={isAgreePopupOpen}
          onClose={closeAllPopup}
          onDelete={handleAgreeCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup
          onClose={closeAllPopup}
          card={selectedCard}
          isOpen={isImagePopupOpen}
        />

        <InfoTooltip
          onClose={closeAllPopup}
          status={status}
          isOpen={infoTooltipIsOpen}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}
