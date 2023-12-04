import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup ({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading
}) {
  const inputAvatarRef = React.useRef()

  function handleSubmit (e) {
    e.preventDefault()
    onUpdateAvatar({ avatar: inputAvatarRef.current.value })
  }

  React.useEffect(() => {
    inputAvatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      popupName='popup-newAvatar'
      title='Обновить аватар'
      popupFormName='newAvatar-form'
      btnText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='url'
        id='linkNewAvatar'
        name='linkNewAvatar'
        className='popup__input popup__input_el_link-newAvatar'
        required
        placeholder='Ссылка на картинку'
        autoComplete='off'
        ref={inputAvatarRef}
      />
      <span className='popup__error-message' id='error-linkNewAvatar'></span>
    </PopupWithForm>
  )
}
