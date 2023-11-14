import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {displayMenu: false}

  changeIcon = () => {
    this.setState(prevState => ({displayMenu: !prevState.displayMenu}))
  }

  logoutEvent = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {displayMenu} = this.state
    return (
      <>
        <nav className="nav-container-small">
          <div className="intermediate-container">
            <Link to="/" className="nav-link">
              <div className="logo-container">
                <img
                  src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699860583/Group_7732_gjihrp.png"
                  alt="website logo"
                  className="website-logo-header-small"
                />
              </div>
            </Link>
            <div className="hamburger-icon">
              <button type="button" className="hamburgerButton">
                <GiHamburgerMenu
                  className="hamburger-icon"
                  onClick={this.changeIcon}
                />
              </button>
            </div>
          </div>
          {displayMenu === true && (
            <ul className="sections-list">
              <Link to="/" className="nav-link">
                <li className="home-section">Home </li>
              </Link>
              <Link to="/shelf" className="nav-link">
                <li className="bookshelves-section">Bookshelves </li>
              </Link>
              <li className="button-list">
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.logoutEvent}
                >
                  Logout
                </button>
              </li>
              <li className="button-list">
                <button type="button" className="close-button">
                  <AiOutlineClose
                    className="close-icon"
                    onClick={this.changeIcon}
                  />
                </button>
              </li>
            </ul>
          )}
        </nav>
        <nav className="nav-container-large">
          <Link to="/" className="nav-link">
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699860583/Group_7732_gjihrp.png"
                alt="website logo"
                className="website-logo-header-large"
              />
            </div>
          </Link>
          <ul className="sections-list">
            <Link to="/" className="nav-link">
              <li className="home-section">Home </li>
            </Link>
            <Link to="/shelf" className="nav-link">
              <li className="bookshelves-section">Bookshelves </li>
            </Link>
            <li className="button-list">
              <button
                type="button"
                className="logout-button"
                onClick={this.logoutEvent}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </>
    )
  }
}
export default withRouter(Header)
