import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-image-container">
      <img
        src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699965135/Group_7484_tn9rju.png"
        alt="not found"
        className="not-found-image"
      />
    </div>
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <div className="not-found-button-container">
      <Link className="nav-link" to="/">
        <button type="button" className="not-found-button">
          Go Back to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
