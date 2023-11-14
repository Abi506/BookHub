import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import Header from '../Header'
import ReactSlick from './ReactSlick'

import './index.css'
import BookShelves from '../BookShelves'

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

  findBooks = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  render() {
    const {data} = this.state
    return (
      <>
        <Header />
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
            <ReactSlick className="react-slick-small" details={data} />
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
      </>
    )
  }
}

export default Home
