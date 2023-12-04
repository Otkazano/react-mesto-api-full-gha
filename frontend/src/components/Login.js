import React from 'react'
import Header from './Header'

export default function Login ({ onLogin, isLoading }) {
  const [inputData, setInputData] = React.useState({ email: '', password: '' })

  function handleChangeEmail (e) {
    setInputData({ email: e.target.value, password: inputData.password })
  }

  function handleChangePassword (e) {
    setInputData({ email: inputData.email, password: e.target.value })
  }

  function handleSubmit (e) {
    e.preventDefault()
    onLogin(inputData)
  }

  return (
    <>
      <Header address={'/sign-up'} text={'Регистрация'} />
      <main className='content'>
        <form
          action='#'
          className='form'
          method='POST'
          onSubmit={handleSubmit}
          name={'loginForm'}
          id={'loginForm'}
        >
          <h2 className='form__title'>Вход</h2>
          <input
            type='email'
            id='emailLoginInput'
            name='emailLoginInput'
            className='form__input'
            required
            placeholder='Email'
            autoComplete='off'
            minLength='2'
            maxLength='64'
            value={inputData.email || ''}
            onChange={handleChangeEmail}
          />
          <input
            type='password'
            id='passwordLoginInput'
            name='passwordLoginInput'
            className='form__input'
            required
            placeholder='Пароль'
            autoComplete='off'
            minLength='2'
            maxLength='64'
            value={inputData.password || ''}
            onChange={handleChangePassword}
          />
          <button
            type='submit'
            form={'loginForm'}
            className='form__btn'
            aria-label='Войти'
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </main>
    </>
  )
}
