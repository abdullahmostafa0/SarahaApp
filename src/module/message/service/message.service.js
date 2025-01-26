import { messageModel } from "../../../../DB/models/message.model.js";
import userModel from "../../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { successResponse } from "../../../utils/response/success.response.js";



export const sendMessage = asyncHandler(
    async (req, res, next)=>{

        const {message, recipientId} = req.body
        const user = await userModel.findOne({_id:recipientId, deleted:false})
        if(!user) {
            return next(new Error("In-valid recipient", {cause:404}))
        }
        const newMessage = await messageModel.create({message, recipientId})
        return successResponse({res, message:"Done", status:201})
    }
)


export const deleteMessage = asyncHandler(
    async (req, res, next)=>{

        const {messageId} = req.params
        const deleted = await messageModel.deleteOne({_id:messageId})
        
        return successResponse({res, message:"Done", status:201})
    }
)