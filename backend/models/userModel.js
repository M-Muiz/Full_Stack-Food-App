import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
    cartData: {
        type: Object,
        default: {}
    }
}, { minimize: false });


const UserModel = mongoose.models.user || mongoose.model("user", userSchema);
export default UserModel;














