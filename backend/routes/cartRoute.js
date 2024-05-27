import express from "express"
import { addToCart, removeFromCart, getCartItems } from "../controllers/cartController.js"
import authMiddleWare from "../middleware/auth.js";


const cartRouter = express.Router();



cartRouter.post("/add", authMiddleWare, addToCart);
cartRouter.get("/get", authMiddleWare, getCartItems);
cartRouter.post("/remove", authMiddleWare, removeFromCart);

export default cartRouter;