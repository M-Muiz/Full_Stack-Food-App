import React, { useContext, useEffect } from 'react'
import './FoodCart.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'


const FoodCart = ({ id, name, price, image, description }) => {

    const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);



    return (
        <div key={id} className='food-cart'>
            <div className="food-cart-image-container">
                <img className='food-cart-image' src={`${url}images/${image}`} alt="food-image" />
                {
                    !cartItem[id] ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="add-icon" /> :
                        <div className="food-cart-counter">
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="remove-icon" />
                            <p>{cartItem[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>
                }
            </div>
            <div className="food-cart-info">
                <div className="food-cart-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="rating" />
                </div>
                <p className="food-cart-desc">
                    {description}
                </p>
                <p className="food-cart-price">
                    ${price}
                </p>
            </div>
        </div>
    )
}

export default FoodCart
