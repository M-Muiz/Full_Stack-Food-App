import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"

export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const url = "http://localhost:4000/";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
            toast.success("Item add to cart")
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            toast.success("Item quantity increased");
        }
        if (token) {
            await axios.post(`${url}api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        toast.success("Item removed from cart");
        if (token) {
            await axios.post(`${url}api/cart/remove`, { itemId }, { headers: { token } });
        }
    };


    const getCartTotal = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount;
    }


    const getFoodList = async () => {
        const res = await axios(`${url}api/food/list`);
        setFoodList(res.data.data);
    };


    const loadCartData = async (token) => {
        const res = await axios.post(`${url}api/cart/get`, {}, { headers: { token } });
        setCartItem(res.data.cartData)
    };


    useEffect(() => {
        async function loadData() {
            await getFoodList();
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                await loadCartData(token);
            };
        }
        loadData();
    }, []);


    const contextValue = {
        food_list,
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        getCartTotal,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;