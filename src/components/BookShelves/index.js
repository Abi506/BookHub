import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import BookItems from '../BookItems'
import NavContainer from '../NavContainer'
import Header from '../Header'

import './index.css'

const status = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    data: [],
    searchText: '',
    apiStatus: status.initial,
    bookshelfName: bookshelvesList[0].value,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {searchText, bookshelfName} = this.state
    this.setState({apiStatus: status.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
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
        rating: each.rating,
        readStatus: each.read_status,
        title: each.title,
      }))

      this.setState({apiStatus: status.success, data: formattedData})
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  filterEvent = event => {
    this.setState({bookshelfName: event.target.value}, () => {
      this.getData()
    })
  }

  selectedEvent = value => {
    this.setState({bookshelfName: value}, () => {
      this.getData()
    })
  }

  searchInput = event => {
    this.setState({searchText: event.target.value})
  }

  searchIconPressed = () => {
    this.getData()
  }

  retryEvent = () => {
    this.getData()
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSuccess = () => {
    const {data, searchText} = this.state

    if (data.length !== 0) {
      return (
        <>
          <BookItems details={data} />
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
        </>
      )
    }
    return (
      <div className="no-books-found-container">
        <div className="no-books-found-image-container">
          <img
            src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699934922/Asset_1_1_tgneam.png"
            alt="no books"
            className="no-books-found-image"
          />
        </div>
        <p className="no-books-found-para">
          Your search for {searchText} did not find any matches.
        </p>
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
    const {bookshelfName} = this.state

    return (
      <>
        <Header />
        <div className="bookshelves-container">
          <div>
            <NavContainer
              className="nav-container"
              details={bookshelfName}
              selectedEvent={this.selectedEvent}
            />
          </div>
          <div className="card-container">
            <div className="input-container">
              <input
                type="search"
                className="input-box"
                onChange={this.searchInput}
                placeholder="Search"
              />

              <div className="search-icon-container">
                <button
                  className="search-button"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.searchIconPressed}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <div className="exchange-small-container">
              <h1 className="bookshelves-main-heading">Bookshelves</h1>
              <h1 className="bookshelves-main-heading-large">
                {bookshelfName}
              </h1>
              <ul className="filter-section">
                {bookshelvesList.map(each => (
                  <li className="each-filter" key={each.id}>
                    <button
                      type="button"
                      className={`filter-button ${
                        bookshelfName === each.value ? 'activeFilter' : ''
                      }`}
                      value={each.value}
                      onClick={this.filterEvent}
                    >
                      {each.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>{this.renderFinal()}</div>
          </div>
        </div>
      </>
    )
  }
}
export default BookShelves
