import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ReactSlick from './ReactSlick'

import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {data: [], apiStatus: status.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: status.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/top-rated-books`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const formattedData = data.books.map(each => ({
        authorName: each.author_name,
        coverPic: each.cover_pic,
        id: each.id,
        title: each.title,
      }))
      console.log(formattedData)
      this.setState({apiStatus: status.success, data: formattedData})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  retryEvent = () => {
    this.getData()
  }

  findBooks = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderFail = () => (
    <div className="bookshelves-failed-container">
      <div>
        <img
          src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699932471/Group_7522_b4fynz.png"
          alt="failure view"
          className="bookshelves-failed-image"
        />
      </div>
      <p className="failed-para">Something went wrong. Please try again</p>
      <div>
        <button
          type="button"
          className="failed-button"
          onClick={this.retryEvent}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderFinal = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.in_progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {data, apiStatus} = this.state
    return (
      <>
        <Header />
        <div>
          {this.renderFinal()}
          <div className="home-container">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <div className="home-button-container">
              <button
                type="button"
                className="find-books-button"
                onClick={this.findBooks}
              >
                Find Books
              </button>
            </div>
            <h1 className="slider-heading">Top Rated Books</h1>
            <div className="main-slider-container">
              {apiStatus === status.success ? (
                <ReactSlick className="react-slick-small" details={data} />
              ) : (
                this.renderFail()
              )}
            </div>
            <div className="social-media-section-container">
              <div>
                <FaGoogle className="common-social-image" />
              </div>
              <div>
                <FaTwitter className="common-social-image" />
              </div>
              <div>
                <FaInstagram className="common-social-image" />
              </div>
              <div>
                <FaYoutube className="common-social-image" />
              </div>
            </div>
            <p className="contact-para">Contact Us</p>
          </div>
        </div>
      </>
    )
  }
}

export default Home
