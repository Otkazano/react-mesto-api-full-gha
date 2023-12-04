import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

export default function Register ({ onRegister, isLoading }) {
  const [inputData, setInputData] = React.useState({ email: '', password: '' })

  function handleChangeEmail (e) {
    setInputData({ email: e.target.value, password: inputData.password })
  }

  function handleChangePassword (e) {
    setInputData({ email: inputData.email, password: e.target.value })
  }

  function handleSubmit (e) {
    e.preventDefault()
    onRegister(inputData)
  }

  return (
    <>
      <Header address={'/sign-in'} text={'Войти'} />
      <main className='content'>
        <form
          action='#'
          className='form'
          method='POST'
          onSubmit={handleSubmit}
          name={'registerForm'}
          id={'registerForm'}
        >
          <h2 className='form__title'>Регистрация</h2>
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
            form={'registerForm'}
            className='form__btn'
            aria-label='Зарегистрироваться'
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
          <Link to='/sign-in' className='form__caption'>
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </main>
    </>
  )
}
