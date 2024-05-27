import useModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        let userData = await useModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await useModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item added to cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add item to cart" })
    }
};

const removeFromCart = async (req, res) => {
    try {
        let userData = await useModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await useModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Item removed from cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to remove item from cart" })
    }
};

const getCartItems = async (req, res) => {

};

export { addToCart, removeFromCart, getCartItems }