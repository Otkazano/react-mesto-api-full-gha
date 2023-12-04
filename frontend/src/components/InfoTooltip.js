import usePopupClose from '../hooks/usePopupClose'
import pictureDone from '../images/done.svg'
import pictureError from '../images/error.svg'

export default function InfoTooltip ({ isOpen, onClose, status }) {
  usePopupClose(isOpen, onClose)
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className={`popup__btn-close`}
          aria-label='Закрыть окно'
          onClick={onClose}
        />

        {status.status === true && <img src={pictureDone} className='popup__picture' alt='Выполнено'/>}
        {status.status === false && (
          <img src={pictureError} className='popup__picture'  alt='Ошибка' />
        )}

        {status.status === true && (
          <h3 className='popup__caption'>{status.message}</h3>
        )}
        {status.status === false && (
          <h3 className='popup__caption'>
            {status.message}
          </h3>
        )}
      </div>
    </div>
  )
}
