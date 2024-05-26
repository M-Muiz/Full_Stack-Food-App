import React, { useState } from 'react'
import "./List.css"
import { api } from "../../utils/api"
import axios from "axios"
import { toast } from "react-toastify"

const List = () => {

  const [list, setList] = useState([]);

  const getFoods = async () => {
    const res = await axios(`${api}food/list`);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  getFoods();

  return (
    <div className="list">

    </div>
  )
}

export default List
