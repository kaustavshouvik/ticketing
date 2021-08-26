import Link from 'next/link';

const Navbar = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Login', href: '/auth/login' },
    currentUser && { label: 'Logout', href: '/auth/logout' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href}, i) => <li key={i} className='nav-link'>
      <Link href={href}><a>{label}</a></Link>
    </li>)

  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/'><a className='navbar-brand'>Book It</a></Link>
      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>
          {links}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
