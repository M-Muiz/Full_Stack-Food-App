import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { assets } from "../../assets/assets"

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    console.log(data)

    const getMyOrders = async () => {
        const res = await axios.post(`${url}api/order/userorders`, {}, { headers: { token } });
        setData(res.data.data);
    }

    useEffect(() => {
        if (token) {
            getMyOrders();
        }
    }, [token])

    return (
        <div className='myorders'>
            <h2>My orders</h2>
            <div className="container">
                {data.map((order, ind) => {
                    return (
                        <div className="my-orders-order" key={ind}>
                            <img src={assets.parcel_icon} alt="orders" />
                            <p>{order.items.map((item, ind)=>{
                                if(ind === order.items.length - 1){
                                    return item.name + " x " + item.quantity
                                }else{
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
