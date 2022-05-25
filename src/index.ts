import express from 'express'
import userRoute from './routes/user.route'
import authRoute from './routes/auth.route'
import {AppDataSource} from "./database/db"
import dotenv from "dotenv"
import "reflect-metadata"
dotenv.config()
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 3000

app.get("/ping",(req,res)=>{
    console.log("here");
    res.send("Pong")
})
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
const main = async ()=>{
    try {
        await AppDataSource.initialize()
        app.listen(PORT,()=>{
            console.log("server run in port : " + PORT);
        })
    } catch (error) {
        console.error(error)
    }
}
main()