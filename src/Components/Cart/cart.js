import Header  from "../Header/header"
import Cookies from 'js-cookie'
import { Navigate } from "react-router-dom"

import './cart.css'


const Cart = () => {

    const accessToken = Cookies.get('jwt_token')

    if (accessToken === undefined) {
        return <Navigate to="/login" />
      }
    
    return (

        <>
        <Header/>
        <div className="cart-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
          alt="cart"
          className="cart-img"
        />
      </div>
    
        </>
    )
   
}
export default Cart