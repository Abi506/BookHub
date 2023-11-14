import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  userNameEvent = event => {
    this.setState({username: event.target.value})
  }

  passwordEvent = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  submitEvent = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const method = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, method)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserName = () => (
    <div className="username-container">
      <label htmlFor="username" className="username-label-styles">
        Username*
      </label>
      <input
        type="text"
        id="username"
        onChange={this.userNameEvent}
        className="username-input-box"
        placeholder="Enter Username"
      />
    </div>
  )

  renderPassword = () => (
    <div className="password-container">
      <label htmlFor="password" className="password-label-styles">
        Password*
      </label>
      <input
        type="password"
        onChange={this.passwordEvent}
        className="password-input-box"
        placeholder="Enter Password"
        id="password"
      />
    </div>
  )

  render() {
    const {isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="website-main-image-container">
          <img
            src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699859304/Ellipse_99_qpcrzu.png"
            alt="website main"
            className="main-image-mobile"
          />
          <img
            src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699862245/Rectangle_1467_lpg2aa.png"
            alt="website main"
            className="main-image-large"
          />
        </div>
        <form className="login-form" onSubmit={this.submitEvent}>
          <div className="container-only-for-large">
            <div className="website-logo-container">
              <img
                src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699860583/Group_7732_gjihrp.png"
                alt="website logo"
                className="website-logo"
              />
            </div>
            <div>{this.renderUserName()}</div>
            <div>{this.renderPassword()}</div>
            {isError && <p className="error-message-styles">{errorMsg}</p>}
            <div className="login-button-container">
              <button type="submit" className="login-button-styles">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default Login
