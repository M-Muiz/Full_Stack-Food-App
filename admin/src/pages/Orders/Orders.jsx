import "./Orders.css";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { assets } from "../../assets/assets";
const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    const res = await axios(`${url}api/order/list`);
    if (res.data.success) {
      setOrders(res.data.data);
    } else {
      toast.error("Something went wrong");
    }
  };

  const statusHandler = async (event, orderId) => {
    const res = await axios.post(`${url}api/order/status`, { orderId, status: event.target.value });
    if (res.data.success) {
      await fetchOrders();
    } else {
      toast.error("Something went wrong");
    }
  };


  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, ind) => (
          <div key={ind} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, ind) => {
                  if (ind === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  } else {
                    return item.name + " x " + item.quantity + ", "
                  }
                }
                )}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipCode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p><span className="bold">Items:</span> {order.items.length}</p>
            <p><span className="bold">Total: </span> ${order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
