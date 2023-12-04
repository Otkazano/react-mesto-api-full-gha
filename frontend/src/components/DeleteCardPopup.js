import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function DeleteCardPopup ({
  isOpen,
  onClose,
  onDelete,
  isLoading
}) {
  function handleSubmit (e) {
    e.preventDefault()
    onDelete()
  }

  return (
    <PopupWithForm
      popupName='popup-agreeDelete'
      title='Вы уверены?'
      popupFormName='agreeDelete-form'
      btnText={isLoading ? 'Удаление...' : 'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}
