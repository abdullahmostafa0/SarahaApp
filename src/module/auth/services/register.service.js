import userModel from "../../../../DB/models/User.model.js";
import { emailEvent } from "../../../utils/events/sendEmail.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash, generateHash } from "../../../utils/security/hash.js";
import { generateEncryption } from "../../../utils/security/encryption.js";
import { generateToken, verifyToken } from "../../../utils/security/token.js";
import { customAlphabet } from 'nanoid'

export const signup = asyncHandler(async (req, res, next)=>{
    
    const {userName, email, password, phone, confirmationPassword} = req.body

    if (password != confirmationPassword)
    {
        return next(new Error("password and confirmationPassword mismatch", {cause:400}))
        
    }
    if(await userModel.findOne({email}))
    {
        
        return next(new Error("Email Exist", {cause:409}))
    }
    const phoneEncryption = generateEncryption({plainText: phone})
    const hashPassword = generateHash({plainText: password})
    
    const {_id} = await userModel.create({userName, email, password: hashPassword, phone: phoneEncryption})
    emailEvent.emit("sendEmail", {email})
    
    return successResponse({res, message: "Done",status:201, data:{_id}});

}) 


export const confirmEmail = asyncHandler(async (req, res, next)=>{
    
        const {authorization} = req.headers
        const decoded = verifyToken({token: authorization, signature: process.env.EMAIL_SINGNATURE})
        const user = await userModel.findOneAndUpdate({email:decoded.email}, {confirmEmail: true})
        
        return successResponse({res, message: "Done", data:{user}});
    
    
})

export const forgetPassword1 = asyncHandler(
    async (req, res, next)=>{

        const {email} = req.body
        const user = await userModel.findOne({email, deleted:false})
        if(!user)
        {
            return next(new Error("In-valid Account", {cause:400}))
        }
        const nanoid = customAlphabet('0123456789', 4)

        const nano =  nanoid()
        const nanoidHash = generateHash({plainText:nano})
        const updated = await userModel.findOneAndUpdate({email}, {OTP:nanoidHash}, {new:true})
        
        const data = {email, nano}
        emailEvent.emit("sendEmailwithCode", data)
        const emailToken = generateToken({payload: {email}, signature: process.env.EMAIL_SINGNATURE})
        return successResponse({res, message:"Done",data:{emailToken}, status:200})
        
    }
)

export const forgetPassword2 = asyncHandler(
    async (req, res, next)=>{

        const {OTP} = req.body
        const {authorization} = req.headers
        const decoded = verifyToken({token: authorization, signature: process.env.EMAIL_SINGNATURE})
        const user = await userModel.findOne({email: decoded.email})
        if(!compareHash({plainText:OTP, hashValue:user.OTP}))
        {
            return next(new Error("In-valid OTP", {cause:400}))
        }
        
        return successResponse({res, message:"Done" , status:200})
        
    }
)

export const forgetPassword3 = asyncHandler(
    async (req, res, next)=>{

        const {password} = req.body
        const {authorization} = req.headers
        const decoded = verifyToken({token: authorization, signature: process.env.EMAIL_SINGNATURE})
        
        const hashPassword = generateHash({plainText:password})
        const updated = await userModel.findOneAndUpdate({email:decoded.email}, {password:hashPassword, changePasswordTime:Date.now(), OTP:null}, {new:true})
        return successResponse({res, message:"Done",data:{updated} , status:201})
        
    }
)