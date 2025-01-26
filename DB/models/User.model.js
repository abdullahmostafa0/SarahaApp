import { model, Schema } from "mongoose";
import { roleTypes } from "../../src/middleware/auth.middleware.js";
export const genderTypes = {
    male: "male",
    female: "female"
}


const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:String,
    gender:{
        type:String,
        enum:Object.values(genderTypes),
        default: genderTypes.male
    },
    image:String,
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:   Object.values(roleTypes),
        default:'User'
    },
    changePasswordTime:Date,
    deleted: {type:Boolean, default:false},
    OTP:{type: String}
}, {timestamps: true})

const userModel = model("User", userSchema)

export default userModel

