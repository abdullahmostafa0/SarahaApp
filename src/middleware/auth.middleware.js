import userModel from "../../DB/models/User.model.js"
import { asyncHandler } from "../utils/error/error.handling.js"
import { verifyToken } from "../utils/security/token.js"

export const roleTypes = {
    User: "User",
    Admin: "Admin",
    HR: "HR"
}

export const authentication = ()=>{
    return asyncHandler( async (req, res, next)=>{
        
            const {authorization} = req.headers
        
            
            let [Barrer, token] = authorization?.split(" ") || []
            let TOKEN_SIGNITURE = undefined;

            if(!Barrer || !token)
            {
                return next(new Error("authorization is required", {cause:400}))
            }
            switch (Barrer) {
                case "Barrer":
                    TOKEN_SIGNITURE = process.env.TOKEN_SIGNITURE
                    break;
                case "Admin":
                    TOKEN_SIGNITURE = process.env.TOKEN_SIGNITURE_ADMIN
                    break;
                default:
                    break;
            }
    
            const decoded = verifyToken({token: token, signature: TOKEN_SIGNITURE})
            if(!decoded?.id)
            {
                
                return next(new Error("In-valid token payload", {cause:400}))
            }
    
            const user = await userModel.findById(decoded.id)
    
            if(!user)
            {
                return next(new Error("Not register account", {cause:404}))
            }
            if(user.changePasswordTime?.getTime() >= (decoded.iat * 1000))
            {
                return next(new Error("Expired credential", {cause: 400}))
            }
            
            req.user = user
            return next()
        })/* catch (error) {
            if(error?.name)
            {
                switch (error.name) {
                    case "TokenExpiredError":
                    case "JsonWebTokenError":
                        return res.status(401).json({message:error});
                    default:
                        break;
                }
            }
            return res.status(500).json({message:"internal server error", error, er_message: error.message})
        }*/
}

export const authorization = (accessRole = [])=>{
    return asyncHandler(async (req, res, next)=>{
        
            
        if(!accessRole.includes(req.user.role))
        {
            return next(new Error("Not auth account", {cause:404}))
        }
        
        return next()
    
    })
}