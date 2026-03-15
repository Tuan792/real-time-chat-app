import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(410).json({message:"Khong co tac gia"});

        const decoded = jwt.verify(token,ENV.JWT_SECRET);
        if(!decoded) return res.status(401).json({message:"Khong co tac gia - kxd giau hieu"});

        const user = await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(404).json({message:"Khong tim thay nguoi dung"});

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(500).json({message:"Internal server error"});
    }
};