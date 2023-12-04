import { Link } from 'react-router-dom'

export default function Header ({ email, address, text, onClick }) {
  return (
    <header className='header'>
      <div className='header__logo'></div>
      <div className='header__texts'>
        <p className='header__text-email'>{email}</p>
        <Link
          to={address}
          className='header__text-link'
          onClick={onClick}
        >
          {text}
        </Link>
      </div>
    </header>
  )
}
