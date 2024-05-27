import useModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {
        let userData = await useModel.find({ _id: req.body.userId });
        console.log(userData)
        let cartData = await userData[0].cartData;
        console.log(cartData)
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

};

const getCartItems = async (req, res) => {

};

export { addToCart, removeFromCart, getCartItems }