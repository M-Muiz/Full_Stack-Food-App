import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";



const app = express();
const port = 4000;


app.use(express.json());
app.use(cors());

connectDB();


app.use("/api/food", foodRouter)


app.get("/", (req, res) => {
    res.send("Hello from server");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

//mongodb+srv://amu:<password>@foodie.zcpnljg.mongodb.net/?