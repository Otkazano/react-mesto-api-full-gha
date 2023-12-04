import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function Card ({
  item,
  onDeleteClick,
  onCardClick,
  onCardLikeClick
}) {
  function handleClick () {
    onCardClick(item)
  }

  function handleLikeClick () {
    onCardLikeClick(item)
  }

  function handleDeleteClick () {
    onDeleteClick(item)
  }

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = item.owner === currentUser._id
  const isLiked = item.likes.some(i => i === currentUser._id)
  const cardLikeButtonClassName = `gallery__likes-icon gallery__btn-like ${
    isLiked && 'gallery__likes-icon_active'
  }`

  return (
    <div className='gallery__item'>
      <img
        src={item.link}
        alt={`Достопромечательность из ${item.name}`}
        className='gallery__photo'
        onClick={handleClick}
      />
      <div className='gallery__info'>
        <h2 className='gallery__location'>{item.name}</h2>
        <div className='gallery__likes'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            aria-label='Отметить фотокарточку лайком'
            onClick={handleLikeClick}
          />
          <p className='gallery__likes-quantity'>{item.likes.length}</p>
        </div>
      </div>

      {isOwn && (
        <button
          type='button'
          className='gallery__delete'
          aria-label='Удалить фотокарточку'
          onClick={handleDeleteClick}
        />
      )}
    </div>
  )
}
