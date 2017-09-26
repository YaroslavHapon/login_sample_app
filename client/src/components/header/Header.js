import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = props => {
  return (
    <nav className="navbar navbar-default">
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        {!props.authenticated &&<li className="nav-item">
          <Link to="/register">Register</Link>
        </li>}
        <li className="nav-item">
          <Link to={props.authenticated ? '/signout' : '/login'}>{props.authenticated ? 'Sign Out' : 'Login'}</Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/profiles">Profiles</Link>
        </li>
      </ul>
    </nav>
  )
}

Header.PropTypes = {
  authenticated: PropTypes.bool.isRequired
}

export default Header