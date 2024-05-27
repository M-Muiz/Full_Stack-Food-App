import jwt from "jsonwebtoken";



const authMiddleWare = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Unathorized Login Again" })
    }

    try {
        const tokenDeconde = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = tokenDeconde.id;
        next();
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: "Token Expired" })
    }
};


export default authMiddleWare;