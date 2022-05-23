import express from 'express'
import userRoute from './routes/user'
import {AppDataSource} from "./database/db"
const app = express()

import "reflect-metadata"
app.use(express.json())
const PORT = 3000

app.get("/ping",(req,res)=>{
    console.log("here");
    res.send("Pong")
})
app.use("/api/users",userRoute)
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