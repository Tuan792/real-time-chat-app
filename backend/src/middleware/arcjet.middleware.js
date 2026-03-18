import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Đã vượt quá giới hạn số lượt truy cập. Vui lòng thử lại sau." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Quyền truy cập của bot bị từ chối." });
      } else {
        return res.status(403).json({
          message: "Quyền truy cập bị từ chối do chính sách bảo mật.",
        });
      }
    }

    // check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Phát hiện bot giả mạo",
        message: "Phát hiện hoạt động của bot độc hại.",
      });
    }

    next();
  } catch (error) {
    console.log("Arcjet Protection Error:", error);
    next();
  }
};
