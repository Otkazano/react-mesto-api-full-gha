import React from 'react'
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './Header.js'
import avatarImg from '../images/Avatar.jpg'

export default function Main ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onDelete,
  onCardClick,
  onCardLikeClick,
  cards,
  email,
  onSignOut
}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <>
      <Header
        email={email}
        address={'/sign-in'}
        text={'Выйти'}
        onClick={onSignOut}
      />
      <main className='content'>
        <section className='profile'>
          <div className='profile__avatar'>
            <button
              type='button'
              className='profile__avatar-btn'
              aria-label='Изменить аватар пользователя'
              onClick={onEditAvatar}
            ></button>
            <img
              className='profile__avatar-img'
              src={currentUser.avatar ? currentUser.avatar : avatarImg}
              alt='Аватар пользователя'
            />
          </div>
          <div className='profile__info'>
            <div className='profile__person'>
              <h1 className='profile__name'>
                {currentUser.name ? currentUser.name : 'Райан Гослинг'}
              </h1>
              <button
                type='button'
                className='profile__btn-edit'
                aria-label='Изменить данные профиля'
                onClick={onEditProfile}
              ></button>
            </div>
            <p className='profile__about'>
              {currentUser.about ? currentUser.about : 'Выгуливаю собак'}
            </p>
          </div>
          <button
            type='button'
            className='profile__btn-add'
            aria-label='Добавить фотокарточку в ленту'
            onClick={onAddPlace}
          ></button>
        </section>

        <section className='gallery' aria-label='Фото-галерея'>
          {cards.map(item => (
            <Card
              item={item}
              onDeleteClick={onDelete}
              onCardClick={onCardClick}
              onCardLikeClick={onCardLikeClick}
              key={item._id}
            />
          ))}{' '}
        </section>
      </main>
    </>
  )
}
