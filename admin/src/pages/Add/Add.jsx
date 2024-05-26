import React from 'react'
import './Add.css'
import { assets } from "../../assets/assets"


const Add = () => {
  return (
    <div className="add">
      <form className='flex-col'>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={assets.upload_area} alt="image" />
          </label>
          <input type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" placeholder="Type Here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" rows={6} placeholder='Write content here' required></textarea>
        </div>
        
        <div className="add-category-price flex-col">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veh</option>
              <option value="Chichken">Chichken</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="number" placeholder="$10" name='price' required />
          </div>
        </div>

        <button type='submit' className='add-btn'>Add Product</button>

      </form>
    </div>
  )
}

export default Add
