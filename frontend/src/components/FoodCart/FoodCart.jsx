import React from 'react'
import './FoodCart.css'
import { assets } from '../../assets/assets'

const FoodCart = ({ id, name, price, image, description }) => {
    return (
        <div className='food-cart'>
            <div className="food-cart-image-container">
                <img className='food-cart-image' src={image} alt="food-image" />
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
