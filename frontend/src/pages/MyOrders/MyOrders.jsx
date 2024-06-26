import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import { assets } from "../../assets/assets"
import { toast } from 'react-toastify';

const MyOrders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const getMyOrders = async () => {
        const res = await axios.post(`${url}api/order/userorders`, {}, { headers: { token } });
        if (res.data.data.length === 0) {
            toast.error("There are no orders yet")
        } else {
            setData(res.data.data);
        }
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
                            <p>{order.items.map((item, ind) => {
                                if (ind === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                } else {
                                    return item.name + " x " + item.quantity + ", "
                                }
                            })}</p>
                            <p>{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={getMyOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders
