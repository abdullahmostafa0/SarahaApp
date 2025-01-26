import mongoose, {Schema, Types, model} from "mongoose"

const messageSchema = new Schema({
    message: {
        type: String,
        required: true, 
        trim:true,
        minlength: 2,
        maxlength:50000},

    recipientId:{type:Types.ObjectId, ref:'User'}
},
{
    timestamps: true
})

export const messageModel = mongoose.models.Message || model("Message", messageSchema)