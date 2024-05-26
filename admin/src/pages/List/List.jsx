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
              <p>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
