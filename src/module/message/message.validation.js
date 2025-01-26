import Joi from "joi"
import { generalFields } from "../../middleware/validation.middleware.js"


export const sendMessage = Joi.object().keys({
    message: Joi.string().pattern(new RegExp(/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF-A-Za-z0-9\s]{2,50000}$/)).required(),
    recipientId: generalFields.id.required()
}).required()

export const deleteMessage = Joi.object().keys({
    messageId: generalFields.id.required()
}).required()