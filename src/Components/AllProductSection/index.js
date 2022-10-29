import { useEffect, useState, useCallback } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import {ColorRing} from 'react-loader-spinner'
import ProductCard from "../ProductCard/productCard"
import ProductHeader from "../ProductHeader/index"
import FilterGroup from "../FilterGroup"

import './index.css'


const categoryOptions = [
    {
      name: 'Clothing',
      categoryId: '1',
    },
    {
      name: 'Electronics',
      categoryId: '2',
    },
    {
      name: 'Appliances',
      categoryId: '3',
    },
    {
      name: 'Grocery',
      categoryId: '4',
    },
    {
      name: 'Toys',
      categoryId: '5',
    },
]

  const sortbyOptions = [
    {
      optionId: 'PRICE_HIGH',
      displayText: 'Price (High-Low)',
    },
    {
      optionId: 'PRICE_LOW',
      displayText: 'Price (Low-High)',
    },
  ]

  const ratingsList = [
    {
      ratingId: '4',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
      ratingId: '3',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
      ratingId: '2',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
      ratingId: '1',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
  ]
  
  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }
  

const AllProductSection = () => {

const [productsList, setProductsList] = useState([]);
const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId)
const [activeCategoryId, setActiveCategoryId] =useState('')
const [searchInput, setSearchInput] = useState('');
const [activeRatingId , setActiveRatingId] = useState('')

const renderProductList = () => {

    const shouldShowProductsList = productsList.length > 0

    return shouldShowProductsList ? (
        
        <div className="all-products-container">
            
            <ProductHeader
                activeOptionId={activeOptionId}
                sortbyOptions={sortbyOptions}
                changeSortby={changeSortby}
            />
            <ul className="products-list">
                {
                    productsList
                    .map(product => (
                        <ProductCard productData={product} key={product.id}/>
                    ))
                }
            </ul>
        </div>
        ) :
        (
            <div className="no-products-view">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
                    className="no-products-img"
                    alt="no products"
                />
                <h1 className="no-products-heading">No Products Found</h1>
                <p className="no-products-description">
                We could not find any products. Try other filters.
                </p>
            </div>
        )
}

const renderFailureView = () => {
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
        --------------Anvesh All Product Section------------------------
      </p>
    </div>
}

const renderLoadingView = () => {
    <div className="products-loader-container">
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

const getProducts = useCallback(async() => {
    
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`

    const options = {
        headers: {
            Authorization: `Bearer ${jwtToken}`,
          }
    }
    axios.get(apiUrl, options)
    .then( res => {

        if (res.statusText === "OK"){
            setApiStatus(apiStatusConstants.success)
            setProductsList(res.data.products)
           
        }
    })
    .catch ( res => {
        setApiStatus(apiStatusConstants.failure)
        console.log(res)
    })
},[activeCategoryId, activeOptionId, searchInput, activeRatingId])



useEffect ( () => {
    getProducts()
}
,[getProducts])


const renderAllProducts = () => {

    switch (apiStatus) {
        case apiStatusConstants.success:
            return renderProductList()
        
        case apiStatusConstants.failure:
            return renderFailureView()
        
            case apiStatusConstants.inProgress:
                return renderLoadingView()
        default:
            return null

    }

}

const changeSortby = activeOptionId => {
  setActiveOptionId(activeOptionId)
  
}

const clearFilterValues = () => {
  
    setActiveCategoryId('')
    setSearchInput('')
   setActiveRatingId('')
  
}

return (
    <div className="all-products-section">
       <FilterGroup
       searchInput={searchInput}
       changeSearchInput={(searchInput)=> setSearchInput(searchInput)}
       categoryOptions={categoryOptions}
       activeCategoryId={activeCategoryId}
       changeCategory={(activeCategoryId)=> setActiveCategoryId(activeCategoryId)}
       changeRating={(activeRatingId)=> setActiveRatingId(activeRatingId)}
       ratingsList={ratingsList}
    
       clearFilterValues={clearFilterValues}
       />
        {renderAllProducts()}
    </div>
)}
export default AllProductSection