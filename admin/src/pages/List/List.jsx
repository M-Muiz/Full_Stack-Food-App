import React, { useDebugValue, useEffect, useState } from 'react'
import "./List.css"
import { url } from "../../utils/api"
import axios from "axios"
import { toast } from "react-toastify"

const List = () => {

  const [list, setList] = useState([]);


  const getFoods = async () => {
    const res = await axios(`${url}api/food/list`);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Something went wrong");
    }
  };


  const removeFood = async (foodId) => {
    toast.dismiss()
    try {
      const res = await axios.post(`${url}api/food/remove`, { id: foodId });
      await getFoods();
      if (res.data.success) {
        toast.success(res.data.message)
      }else{
        toast.error("Error")
      }
    } catch (error) {
      toast.error(error)
    }
  };

  const alert = (id) => {
    toast.error(<>
      Do you want to delete?
      <button className='btn' onClick={() => removeFood(id)}>Delete</button>
    </>)
  }


  useEffect(() => {
    getFoods();
  }, [])

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Actions</b>
        </div>

        {list.map((item, ind) => {
          return (
            <div key={ind} className="list-table-format">
              <img src={`${url}images/` + item.image} alt="image" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => alert(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
