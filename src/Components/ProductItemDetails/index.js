import { useCallback, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { useParams } from "react-router-dom"
import axios from "axios"
import Header from '../Header/header'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {Link} from "react-router-dom"
import {ColorRing} from 'react-loader-spinner'
import SimilarProductItem from "../SimilarProductItem"

import './index.css'



const apiStatusConstants = {

    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

const ProductItemDetails = () => {

    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [productsData, setProductsData] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [similarProductsData, setSimilarProductsData] = useState([])
    const params = useParams()
    
const getProductData = useCallback( async() => {
    setApiStatus(apiStatusConstants.inProgress)
    
    const jwtToken = Cookies.get('jwt_token')
    const options = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        }
    }
    const url =  `https://apis.ccbp.in/products/${params.id}`

    axios.get(url, options)
    .then( (res) => {
      
        if (res.statusText=== "OK"){
            setApiStatus(apiStatusConstants.success)
            setProductsData(res.data) 
            setSimilarProductsData(res.data.similar_products)
            
        }
    })
    .catch ( (res) => {
       
        if (res.status === 404){
            setApiStatus(apiStatusConstants.failure)
            console.log(res)
        }
        
    })
},[params.id])

useEffect ( () => {
    getProductData()
    }, [getProductData])

const renderLoadingView = () => {
    <div className="products-details-loader-container" testid="loader">
   
      <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
   
  </div>
    }

const renderFailureView = () => {
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
}

const renderProductDetailsView = () => {

    const {
        availability,
        brand,
        description,
        image_url,
        price,
        rating,
        title,
        totalReviews,
      } = productsData

    return (
        <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={image_url} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p className="price-details">Rs {price}/-</p>
            <div className="rating-and-reviews-count">
              <div className="rating-container">
                <p className="rating">{rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star"
                />
              </div>
              <p className="reviews-count">{totalReviews} Reviews</p>
            </div>
            <p className="product-description">{description}</p>
            <div className="label-value-container">
              <p className="label">Available:</p>
              <p className="value">{availability}</p>
            </div>
            <div className="label-value-container">
              <p className="label">Brand:</p>
              <p className="value">{brand}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={()=> quantity>1 ? setQuantity(prev => (prev-1)): null}
                testid="minus"
              >
                <BsDashSquare className="quantity-controller-icon" />
              </button> 
              <p className="quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={()=> setQuantity(prev => (prev+1))}
                testid="plus"
              >
                <BsPlusSquare className="quantity-controller-icon" />
              </button>
            </div>
            <button type="button" className="button add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 className="similar-products-heading">Similar Products</h1>
        <ul className="similar-products-list">
          {similarProductsData.map(eachSimilarProduct => (
            <SimilarProductItem
              productDetails={eachSimilarProduct}
              key={eachSimilarProduct.id}
            />
          ))}
        </ul>
      </div>
    )
}

    const renderProductDetails = () => {

        switch (apiStatus) {
            case apiStatusConstants.success:
              return renderProductDetailsView()
            case apiStatusConstants.failure:
              return renderFailureView()
            case apiStatusConstants.inProgress:
              return renderLoadingView()
            default:
              return null
          }
    }

    return (
        <>
        <Header/>
        <div className="product-item-details-container">
          {renderProductDetails()}
        </div>
        </>
    )
}
export default ProductItemDetails