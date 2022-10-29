import {Link} from 'react-router-dom'

import './producrCard.css'

const ProductCard = ({productData}) => {

    const {title, brand, image_url, rating, price, id} = productData

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
      <img src={image_url} alt="product" className="thumbnail" />
      <h1 className="title">{title}</h1>
      <p className="brand">by {brand}</p>
      <div className="product-details">
        <p className="price">Rs {price}/-</p>
        <div className="rating-container">
          <p className="rating">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
      </Link>
    </li>
  )
}
export default ProductCard