import nodemailer from "nodemailer"



// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async ({ to = "", cc = "", bcc = "", subject = "Confirm-Email", text = "", html = "", attachments = "" } = {}) => {
    return new Promise((resolve, reject) => {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
            pool: true,
            debug: true,
            logger: true
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
        }, (err, info) => {
            if (err) {
                reject(err)
            } else {
                resolve(info)
            }

        });



        console.log("Message sent: %s", info.messageId);



    })

    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

