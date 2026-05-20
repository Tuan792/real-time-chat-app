import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Chào mừng!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Lỗi gửi email chào mừng:", error);
    throw new Error("Gửi email chào mừng thất bại");
  }

  console.log("Gửi email chào mừng thành công", data);
};
