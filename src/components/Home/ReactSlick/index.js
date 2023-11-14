import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const {details} = props

  const calculateSlidesToShow = () => {
    const windowWidth = window.innerWidth

    if (windowWidth >= 780) {
      return 4
    }
    return 2
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: calculateSlidesToShow(),
    slideToShow: 2,
  }
  return (
    <>
      <div className="slider-container-small">
        <Slider {...settings}>
          {details.map(each => (
            <Link
              to={`/books/${each.id}`}
              className="nav-link-top-rated"
              key={each.id}
            >
              <div className="each-slick">
                <div className="slick-image-container">
                  <img
                    src={each.coverPic}
                    alt={each.title}
                    className="slick-image"
                  />
                </div>
                <h1 className="slick-heading">{each.title}</h1>
                <p className="slick-para">{each.authorName}</p>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default ReactSlick
