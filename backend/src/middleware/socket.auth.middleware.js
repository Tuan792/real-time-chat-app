import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Không được phép - Không có mã thông báo nào được cung cấp"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      console.log("Kết nối socket bị từ chối: Mã thông báo không hợp lệ");
      return next(new Error("Không được phép - Mã thông báo không hợp lệ"));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Kết nối socket bị từ chối: Không tìm thấy người dùng.");
      return next(new Error("Không tìm thấy người dùng"));
    }

    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Kết nối đã được xác thực cho người dùng: ${user.fullName} (${user._id})`);

    next();
  } catch (error) {
    console.log("Lỗi xác thực socket:", error.message);
    next(new Error("Không được phép - Xác thực thất bại"));
  }
};
