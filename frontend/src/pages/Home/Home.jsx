import React, { useState } from 'react'
import "./Home.css"
import Header from "../../components/Header/Header"
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'

const Home = () => {

  const [category, setCategory] = useState("All")
  console.log(category)
  return (
    <div>

      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* http://www.dodear.com/en/videos/383387 */}
    </div>
  )
}

export default Home;