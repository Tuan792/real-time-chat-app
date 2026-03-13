import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemmplates.js"; 

export const sendWelcomeEmail = async (email,name,clientURL) => {
    const {data, error} = await resendClient.emails.send ({
        from:`${sender.name} <${sender.email}>`,
        to: email,
        subject:"Chao mung den voi ung dung",
        html: createWelcomeEmailTemplate(name,clientURL),
    });

    if (error) {
        console.error("Loi gui tin nhan chao mung: ", error);
        throw new Error("That bai gui tin nhan chao mung");
    }
    
    console.log("Gui tin nhan thanh cong", data);
    };