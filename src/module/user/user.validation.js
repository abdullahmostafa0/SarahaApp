import Joi from "joi";
import { generalFields, validateObjectId } from "../../middleware/validation.middleware.js";



export const updateProfile = Joi.object().keys({
    userName: generalFields.userName,
    phone: generalFields.phone,
    gender: generalFields.gender,
    DOB: Joi.date().less("now")
})


export const updatePassword = Joi.object().keys({
    oldPassword: generalFields.password.required(),
    password: generalFields.password.not(Joi.ref("oldPassword")).required(),
    confirmationPassword: generalFields.confirmationPassword.valid(Joi.ref("password")).required(),
    DOB: Joi.date().less("now")
})

export const shareProfile = Joi.object().keys({
    userId: generalFields.id.required()
})