import React, { useState } from 'react'
import './FoodCart.css'
import { assets } from '../../assets/assets'

const FoodCart = ({ id, name, price, image, description }) => {

    const [itemCount, setItemCount] = useState(0);

    return (
        <div className='food-cart'>
            <div className="food-cart-image-container">
                <img className='food-cart-image' src={image} alt="food-image" />
                {
                    !itemCount ? <img className='add' onClick={()=> setItemCount(prev => prev + 1)} src={assets.add_icon_white} alt="add-icon" /> :
                     <div className="food-cart-counter">
                        <img onClick={()=> setItemCount(prev => prev - 1)} src={assets.remove_icon_red} alt="remove-icon" />
                        <p>{itemCount}</p>
                        <img onClick={()=> setItemCount(prev => prev + 1)} src={assets.add_icon_green} alt="" />
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
