import nodemailer from "nodemailer"
import { Resend } from 'resend';


// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async ({ to = "", cc = "", bcc = "", subject = "Confirm-Email", text = "", html = "", attachments = "" } = {}) => {
    /*const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:465,
        secure:true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
        pool: true
    });
    
    // send mail with defined transport object
    
        const info = transporter.sendMail({
            from: `"Saraha App" <${process.env.EMAIL}>`, // sender address
            to, // list of receivers
            cc,
            bcc,
            subject, // Subject line
            text, // plain text body
            html,
            attachments // html body
        
    })
    

    console.log("Message sent:");
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

*/
    const resend = new Resend('re_jEUgDbt6_GAsdpqShkyybm8JsaPCLiMBK');

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to : to,
        subject: subject,
        html: html,
    });
    console.log("message sent")
}

