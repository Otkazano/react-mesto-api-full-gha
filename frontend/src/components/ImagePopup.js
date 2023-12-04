import React from 'react'
import usePopupClose from '../hooks/usePopupClose'

export default function ImagePopup ({ isOpen, onClose, card }) {
  usePopupClose(isOpen, onClose)
  return (
    <div
      className={`popup popup-image popup_theme_dark ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className='popup-image__container'>
        <button
          type='button'
          className='popup__btn-close popup-image__btn-close'
          aria-label='Закрыть окно увеличенной фотокарточки'
          onClick={onClose}
        ></button>
        <img
          src={card.link}
          alt={`Достопромечательность из ${card.name}`}
          className='popup-image__img'
        />
        <p className='popup-image__about'>{card.name}</p>
      </div>
    </div>
  )
}
