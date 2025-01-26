import express from "express"
import bootstrap from "./src/app.controller.js"
import * as dotenv from "dotenv"
import path from "path"
dotenv.config({path: path.resolve("./src/config/.env.prod")})
const PORT = process.env.PORT;
const app = express()

bootstrap(app, express);


app.listen(PORT, ()=>{
    console.log(`server is runing on port :::: ${PORT}`);
})



