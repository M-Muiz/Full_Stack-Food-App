import React, { useState } from 'react'
import "./Home.css"
import Header from "../../components/Header/Header"
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category, setCategory] = useState("All")
  console.log(category)
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category}/>
      {/* http://www.dodear.com/en/videos/383387 */}
    </div>
  )
}

export default Home;