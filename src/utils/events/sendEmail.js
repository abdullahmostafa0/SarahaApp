
import { EventEmitter } from "node:events";
import {sendEmail } from "../email/email.js";
import {generateEmailTemplates} from "../email/Template.js"
import { generateToken } from "../security/token.js";

export const emailEvent = new EventEmitter()

emailEvent.on("sendEmail", async (data)=>{
    const {email} = data
    const emailToken = generateToken({payload: {email}, signature: process.env.EMAIL_SINGNATURE})
    const emailLink = `${process.env.FE_URL}/confirmEmail/${emailToken}`
    const html = generateEmailTemplates(emailLink)
    await sendEmail({to:email, subject:"Confirm Email", html})

})

emailEvent.on("sendEmailwithCode", async (data)=>{
    const {email, nano} = data
    sendEmail({to:email, subject:"Confirm Code", html:`<h1>${nano}</h1>`})

})