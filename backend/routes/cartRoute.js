import express from "express"
import { addToCart, removeFromCart, getCartItems } from "../controllers/cartController.js"



const cartRouter = express.Router();



cartRouter.post("/add", addToCart);
cartRouter.get("/get", getCartItems);
cartRouter.post("/remove", removeFromCart);

export default cartRouter;