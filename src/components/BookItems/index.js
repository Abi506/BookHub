import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItems = props => {
  const {details} = props

  return (
    <ul className="list-of-books">
      {details.map(each => (
        <Link to={`/books/${each.id}`} className="nav-link" key={each.id}>
          <li className="each-book-items">
            <div className="cover-pic-container">
              <img src={each.coverPic} alt={each.title} className="cover-pic" />
            </div>
            <div className="book-detail-container">
              <h1 className="book-detail-heading">{each.title}</h1>
              <p className="book-detail-para">{each.authorName}</p>
              <div className="book-detail-span-container">
                <p className="book-detail-span-para">Avg Rating</p>
                <BsFillStarFill className="star-icon" />
                <span className="book-detail-span">{each.rating}</span>
              </div>
              <p className="book-detail-read-status">
                Status:
                <span className="book-detail-read-status-span">
                  {each.readStatus}
                </span>
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default BookItems
