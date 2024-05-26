import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
    },
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    }
});

const FoodModel = mongoose.models.food || mongoose.model("Food", foodSchema);

export default FoodModel;