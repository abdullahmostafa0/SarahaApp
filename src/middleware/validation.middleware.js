import Joi from "joi"
import { genderTypes } from "../../DB/models/User.model.js"
import { Types } from "mongoose"

export const validateObjectId = (value, helper)=>{
    return Types.ObjectId.isValid(value)
    ? true : helper.message("In-valid objectId")
}

export const generalFields ={
    userName : Joi.string().min(2).max(25),
    email: Joi.string().email({minDomainSegments: 2, maxDomainSegments:3, tlds:{allow:["com", "edu"]}}),
    password: Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
    confirmationPassword: Joi.string().valid(Joi.ref('password')),
    phone: Joi.string().pattern(new RegExp(/^(002|\+2)?01[0125][0-9]{8}$/)),
    //acceptLanguage: Joi.string().valid("en", "ar").default("en"),
    gender : Joi.string().valid(genderTypes.male, genderTypes.female),
    id: Joi.string().custom(validateObjectId),
    authorization: Joi.string()

}


export const validation = (schema)=>{
    return (req, res, next)=>{

        const inputData = {...req.body, ...req.query, ...req.params}
        /*if(req.headers['accept-language'])
        {
            inputData['accept-language'] = req.headers['accept-language']
        }*/
        

        const validationError = schema.validate(inputData, {abortEarly:false})

        if(validationError.error)
        {
            //return next(new Error(`${validationError.error.details}`, {cause:400}))
            return res.status(400).json({message: "validation error",validatoinError: validationError.error.details})
        }
        return next()
    
    }
}

/*export const validation_old = (schema)=>{
    return (req, res, next)=>{
        const validationResult = []
        for (const key of Object.keys(schema)) {

            const validationError = schema[key].validate(req[key], {abortEarly:false})

            if(validationError.error)
            {
                validationResult.push(validationError.error.details)
            }
            
        }
        if(validationResult.length > 0)
        {
            return res.status(400).json({message: "Validation result", validationResult})
        }
        return next()
    
    }
}*/