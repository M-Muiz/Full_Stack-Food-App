import express from "express"
import authMiddleWare from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, usersOrders, verfiyOrder } from "../controllers/orderController.js"


const orderRouter = express.Router();

orderRouter.post("/place", authMiddleWare, placeOrder);
orderRouter.post("/verify", verfiyOrder);
orderRouter.post("/userorders", authMiddleWare, usersOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);


export default orderRouter;