import React, { useState } from 'react'
import './Add.css'
import { assets } from "../../assets/assets"
import axios from "axios"
import { toast } from 'react-toastify'
import { url } from "../../utils/api"

const Add = () => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });

  const onChnageHandler = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const res = await axios.post(`${url}api/food/add`, formData);
    if (res.data.success) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      })
      setImage(false)
      toast.success(res.data.message)
    } else {
      toast.error(res.data.message)
    }

  }


  return (
    <div className="add">
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="image" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input name="name" onChange={onChnageHandler} value={data.name} type="text" placeholder="Type Here" required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChnageHandler} value={data.description} name="description" rows={6} placeholder='Write content here' required></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChnageHandler} name="category">
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
            <input onChange={onChnageHandler} value={data.price} type="number" placeholder="$10" name='price' required />
          </div>
        </div>

        <button type='submit' className='add-btn'>Add Product</button>

      </form>
    </div>
  )
}

export default Add
