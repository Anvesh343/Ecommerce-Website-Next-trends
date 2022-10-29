import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
import axios from "axios"
import {ColorRing} from 'react-loader-spinner'
import ProductCard from '../ProductCard/productCard'

import './index.css'


const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export const PrimeDealsSection = ()=> {

    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [primeDeals, setPrimeDeals] = useState([])

    
    const getPrimeDeals = async() => {
      setApiStatus(apiStatusConstants.inProgress)

        const jwtToken = Cookies.get('jwt_token')
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
              }
        }
        const url = 'https://apis.ccbp.in/prime-deals'
            
         axios.get(url, options)
         .then(res => {
            
            if (res.statusText === 'OK') {
                setPrimeDeals(res.data.prime_deals)
                setApiStatus(apiStatusConstants.success)
                
            }
        })
        .catch(err=> 
            
            setApiStatus(apiStatusConstants.failure)
            
            )

    }


    useEffect ( () => {
        getPrimeDeals()
    }
    ,[])

    const renderPrimeDetails = () => {

        
        return (
            <div>
              <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
              <ul className="products-list">
                {primeDeals.map(product => (
                  <ProductCard productData={product} key={product.id} />
                  
                ))}
              </ul>
            </div>
          )
    }
    

    const rendurePrimeDetailsFailure = () => {
        <>
        <img
            src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
            alt="register prime"
            className="register-prime-img" />
            <p>--------------anvesh-------------</p>
        </>
    }

    const renderLoadingView = () => (
        <div className="primedeals-loader-container">
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
      )

const renderPrimeDeal = () => {
  
  switch (apiStatus) {
    case apiStatusConstants.success:
        return renderPrimeDetails()
    
    case apiStatusConstants.failure:
        return rendurePrimeDetailsFailure()
    
        case apiStatusConstants.inProgress:
            return renderLoadingView()
    default:
        return null

}
}

    return(
      <div>
        {renderPrimeDeal()}
      </div> 
    )
}