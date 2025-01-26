
import Joi from 'joi'
import { generalFields } from '../../middleware/validation.middleware.js'


export const signupSchema = 
    Joi.object().keys({
        userName: generalFields.userName.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        confirmationPassword: generalFields.confirmationPassword.required(),
        phone: generalFields.phone.required()
        //"accept-language" : generalFields.acceptLanguage.required()    
        
    }).required()


export const confirmEmail = 
    Joi.object().keys({
        
        "authorization": generalFields.authorization.required()    
        
    }).required()

export const login = 
    Joi.object().keys({
        email: generalFields.email.required(),
        password : generalFields.password.required()   
}).required()

export const forgetPassword1 = 
    Joi.object().keys({
        email: generalFields.email.required(),
}).required()

export const forgetPassword2 = 
    Joi.object().keys({
        OTP: Joi.string().pattern(new RegExp(/^[0-9]{1,4}$/))
}).required()

export const forgetPassword3 = 
    Joi.object().keys({
        password: generalFields.password.required(),
        confirmationPassword: generalFields.confirmationPassword.required(),
}).required()

    

/*
export const signupSchema_old = {
    body:Joi.object().keys({
        userName: Joi.string().min(2).max(25).required(),
        email: Joi.string().email({minDomainSegments: 2, maxDomainSegments:3, tlds:{allow:["com", "edu"]}}).required(),
        password: Joi.string().required(),
        confirmationPassword: Joi.string().valid(Joi.ref('password')).required(),
        phone: Joi.string(),
        
    }).required(),

    query: Joi.object().keys({
        lang : Joi.string().valid("en", "ar").default("en").required()    
    }).required()
}*/
