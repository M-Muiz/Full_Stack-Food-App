import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodCart from '../FoodCart/FoodCart'
const FoodDisplay = ({ category }) => {

  const { food_list } = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, ind) => {
          if (category == "All" || item.category === category) {
            return <FoodCart key={ind} id={item._id} name={item.name} price={item.price} image={item.image} description={item.description} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
