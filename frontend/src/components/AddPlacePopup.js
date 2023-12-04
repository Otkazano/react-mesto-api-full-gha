import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup ({
  isOpen,
  onClose,
  onAddPlace,
  isLoading
}) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function handleChangeName (e) {
    setName(e.target.value)
  }

  function handleChangeLink (e) {
    setLink(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    onAddPlace({ name, link })
  }

  return (
    <PopupWithForm
      popupName='popup-newImage'
      title='Новое место'
      popupFormName='newImage-form'
      btnText={isLoading ? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        id='nameNewImage'
        name='nameNewImage'
        className='popup__input popup__input_el_name-newImage'
        required
        placeholder='Название'
        autoComplete='off'
        minLength='2'
        maxLength='30'
        value={name}
        onChange={handleChangeName}
      />
      <span className='popup__error-message' id='error-nameNewImage'></span>
      <input
        type='url'
        id='linkNewImage'
        name='linkNewImage'
        className='popup__input popup__input_el_link-newImage'
        required
        placeholder='Ссылка на картинку'
        autoComplete='off'
        value={link}
        onChange={handleChangeLink}
      />
      <span className='popup__error-message' id='error-linkNewImage'></span>
    </PopupWithForm>
  )
}
