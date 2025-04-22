const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const authRouter = require("./Router/auth")
const expenceRouter = require("./Router/tracker")
const { Connectdb } = require("./Config/db")

const app = express()
dotenv.config({path:"./Config/config.env"})
app.use(
    cors({
      origin:process.env.CORS_PORT||"http://localhost:3000", 
      methods: ["GET", "POST","PUT","DELETE"],
      credentials: true,
    })
  );
app.use(bodyParser.json({
    limit:"30mb"
}))
app.use(morgan("dev"))

Connectdb()

app.get("/",(req,res)=>{
    try {
        res.send("hello")
    } catch (error) {
        console.log(error);
    }
})
app.use("/auth",authRouter)
app.use("/expence",expenceRouter)

app.listen(process.env.PORT,()=>{
    console.log("server is runing");
})