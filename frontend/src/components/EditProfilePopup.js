import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup ({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading
}) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleChangeName (e) {
    setName(e.target.value)
  }

  function handleChangeDescription (e) {
    setDescription(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm
      popupName='popup-profile'
      title='Редактировать профиль'
      popupFormName='profile-form'
      btnText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        id='nameProfile'
        name='nameProfile'
        className='popup__input popup__input_el_name-profile'
        required
        placeholder='Имя'
        autoComplete='off'
        minLength='2'
        maxLength='40'
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className='popup__error-message' id='error-nameProfile'></span>
      <input
        type='text'
        id='aboutProfile'
        name='aboutProfile'
        className='popup__input popup__input_el_about-profile'
        required
        placeholder='О себе'
        autoComplete='off'
        minLength='2'
        maxLength='200'
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span className='popup__error-message' id='error-aboutProfile'></span>
    </PopupWithForm>
  )
}
