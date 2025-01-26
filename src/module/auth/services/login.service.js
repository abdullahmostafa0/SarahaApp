import userModel from "../../../../DB/models/User.model.js";
import { roleTypes } from "../../../middleware/auth.middleware.js";
import { asyncHandler } from "../../../utils/error/error.handling.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { compareHash } from "../../../utils/security/hash.js";
import { generateToken } from "../../../utils/security/token.js";



export const login = asyncHandler(async (req, res, next)=>{
    
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        
        if(!user)
        {
            return next(new Error("In-Valid Account", {cause:404}))
        }
        if(!user.confirmEmail)
        {
            
            return next(new Error("please confirm email first", {cause:400}))
        }
        const match = compareHash({plainText:password, hashValue:user.password})

        if(!match)
        {
            return next(new Error("In-Valid Account credential", {cause:404}))
        }
        user.deleted = false
        await user.save()
        const token = generateToken({payload: {id: user._id}, signature: user.role == roleTypes.User ? process.env.TOKEN_SIGNATURE : process.env.TOKEN_SIGNATURE_ADMIN, 
                                    options: {expiresIn:"1h"}})
                                    
        return successResponse({res, message: "Done", data:{token}});
    
})

