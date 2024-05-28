import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; 

const PlaceOrder = () => {

  const { getCartTotal, food_list, cartItem, url, token } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const placeorder = async (event) => {
    event.preventDefault();
    toast.loading("Loading...")
    setLoading(true);
    let orderItems = [];
    food_list.map((item) => {
      if (cartItem[item._id]) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getCartTotal() + 2,
    }

    let res = await axios.post(`${url}api/order/place`, orderData, { headers: { token } });
    if (res.data.success) {
      toast.dismiss()
      setLoading(false);
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      toast.dismiss()
      setLoading(false);
      toast.error(res.data.message)
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Please login first")
      navigate("/cart")
    }
    else if (getCartTotal() === 0) {
      toast.error("Cart is empty")
      navigate("/cart")
    }
  }, [token])


  return (
    <form onSubmit={placeorder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required onChange={handleChange} name="firstName" value={data.firstName} type="text" placeholder="First Name" />
          <input required onChange={handleChange} name="lastName" value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required onChange={handleChange} name="email" value={data.email} type="text" placeholder='Email Address' />
        <input required onChange={handleChange} name="street" value={data.street} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required onChange={handleChange} name="city" value={data.city} type="text" placeholder="City" />
          <input required onChange={handleChange} name="state" value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required onChange={handleChange} name="zipCode" value={data.zipCode} type="text" placeholder="Zip Code" />
          <input required onChange={handleChange} name="country" value={data.country} type="text" placeholder="Coutry" />
        </div>
        <input required onChange={handleChange} name="phone" value={data.phone} type="text" placeholder='Phone Number' />

      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getCartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getCartTotal() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getCartTotal() === 0 ? 0 : getCartTotal() + 2}</b>
            </div>
          </div>
          <button disabled={loading} type="submit">PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
