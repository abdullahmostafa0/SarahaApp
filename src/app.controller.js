import connectDB from "../DB/connection.js";
import authRouter from "./module/auth/auth.controller.js"
import userRouter from "./module/user/user.controller.js"
import messageRouter from "./module/message/message.controller.js"
import { globalErrorHandling } from "./utils/error/error.handling.js";
import cors from "cors"
const bootstrap = (app, express)=>
{
    const corsOptions = {
        origin: "*"
    }
    app.use(cors(corsOptions))
    app.get("/", (req, res)=>{res.send("hello ");})
    app.use(express.json());
    app.use("/auth", authRouter)
    app.use("/user", userRouter)
    app.use("/message", messageRouter)
    
    app.use(globalErrorHandling)
    connectDB()
}

export default bootstrap