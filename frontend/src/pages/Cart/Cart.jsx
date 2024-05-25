import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../context/StoreContext'
const Cart = () => {

  const {cartItem, addToCart, removeFromCrt } = useContext(StoreContext);

  return (
    <div>
      cart
    </div>
  )
}

export default Cart
