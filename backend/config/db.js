import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://amu:amu2260350@foodie.zcpnljg.mongodb.net/foodie").then(() => console.log("DB Connected"));
};