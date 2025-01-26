import { messageModel } from "../../../../DB/models/message.model.js";
import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { generateDecryptoin, generateEncryption } from "../../../utils/security/encryption.js";
import { compareHash, generateHash } from "../../../utils/security/hash.js";



export const userProfile = asyncHandler (async (req, res, next)=>{

    req.user.phone = generateDecryptoin({ciphenText: req.user.phone, signature: process.env.ENCRYPTION_SIGNTURE})
    const messages = await messageModel.find({recipientId: req.user._id})
    return successResponse({res, status:200, data:{user: req.user, messages}})

})


export const updateProfile = asyncHandler (async (req, res, next)=>{
    const {userName, phone, gender, DOB} = req.body
    if(phone)
    {
        req.body.phone = generateEncryption({plainText: req.body.phone})
    }

    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, {new: true, runValidators:true})
    
    return successResponse({res, status:200, data:{user: user}})
    

})

export const updatePassword = asyncHandler (async (req, res, next)=>{
    const {oldPassword, password} = req.body
    
    if(!compareHash({plainText: oldPassword, hashValue: req.user.password}))
    {
        return next(new Error ("In valied user passowrd", {cause : 400}))
    }
    const hashPassword = generateHash({plainText: password})
    const user = await userModel.findByIdAndUpdate(req.user._id, {password: hashPassword, changePasswordTime: Date.now()}, {new: true })
    return successResponse({res, status:200, data:{user: user}})
    

})


export const freezeAccount = asyncHandler (async (req, res, next)=>{
    
    const user = await userModel.findByIdAndUpdate(req.user._id, {deleted:true, changePasswordTime: Date.now()}, {new: true })
    return successResponse({res, status:200, data:{user: user}})
    

})

export const shareProfile = asyncHandler (async (req, res, next)=>{

    const user = await userModel.findById(req.params.userId).select("userName image")
    
    return user? successResponse({res, status:200, data:{user: user}}) :
    next(new Error("In-valid account id", {cause: 404}))
    

})
