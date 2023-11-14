import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {data: [], apiStatus: status.initial}

  componentDidMount() {
    this.getData()
  }

  retryEvent = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: status.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        aboutAuthor: data.book_details.about_author,
        aboutBook: data.book_details.about_book,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        id: data.book_details.id,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        title: data.book_details.title,
      }
      this.setState({data: formattedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {data} = this.state
    console.log(data)
    const {
      aboutAuthor,
      aboutBook,
      authorName,
      coverPic,
      rating,
      readStatus,
      title,
    } = data

    return (
      <div className="bookItemDetails-success-container">
        <div className="bookItemDetails-success-bookDetails-container">
          <div className="bookItemDetails-image-container">
            <img src={coverPic} alt={title} className="bookItemDetails-image" />
          </div>
          <div className="bookItemDetails-book-details-container">
            <h1 className="bookItemDetails-heading">{title}</h1>
            <p className="BookItemDetails-para">{authorName}</p>
            <div className="BookItemDetails-span-container">
              <p className="BookItemDetails-span-para">Avg Rating</p>
              <BsFillStarFill className="bookItemDetails-star-icon" />
              <span className="bookItemDetails-span"> {rating}</span>
            </div>
            <p className="bookItemDetails-read-status">
              Status:
              <span className="bookItemDetails-read-status-span">
                {readStatus}
              </span>
            </p>
          </div>
        </div>
        <hr className="BookItemDetails-separator" />
        <div>
          <h1 className="bookItemDetails-about-author">About Author</h1>
          <p className="bookItemDetails-about-author-para">{aboutAuthor}</p>
        </div>
        <div>
          <h1 className="bookItemDetails-about-book">About Book</h1>
          <p className="bookItemDetails-about-book-para">{aboutBook}</p>
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
    )
  }

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
      case status.success:
        return this.renderSuccess()
      default:
        return this.renderFail()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="BookItemDetails-container">
          <div>{this.renderFinal()}</div>
        </div>
      </>
    )
  }
}
export default BookItemDetails
