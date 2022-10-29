import Header from '../Header/header'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import './products.css'
import { PrimeDealsSection } from '../PrimeDealSection'
import AllProductSection from '../AllProductSection'


const Products =()=> {

    const accessToken = Cookies.get('jwt_token')

    if (accessToken === undefined) {
        return <Navigate to="/login" />
      }

    return (
        <>
        <Header/>
        <div className="products-container">
        <PrimeDealsSection/>
        <AllProductSection/>
        </div>
        
        </>
    )
}
export default Products