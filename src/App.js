import {Route, Routes} from 'react-router-dom'

import Home from './Components/Home/home'
import LoginForm from './Components/LogingForm/loginform'
import Products from './Components/Products/products'
import Cart from './Components/Cart/cart'
import NotFOund from './Components/NotFound/notfound'
import ProductItemDetails from './Components/ProductItemDetails'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'


import './App.css';

const App = () => {

return (
      <Routes>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/' element={
         <ProtectedRoute>
          <Home/>
        </ProtectedRoute> }/>
        <Route path='/products' element={
        <ProtectedRoute>
          <Products/>
        </ProtectedRoute>
        }/>
      <Route path='/products/:id' element={
        <ProtectedRoute>
          <ProductItemDetails/>
        </ProtectedRoute>
        }/>
        <Route path='/cart' element={<ProtectedRoute>
          <Cart/>
        </ProtectedRoute>}/>
        <Route path='*' element={<NotFOund/>}/>
      </Routes>
)
}
export default App;
