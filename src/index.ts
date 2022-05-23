import express from 'express'
import userRoute from './routes/user'
const app = express()

app.use(express.json())
const PORT = 3000

app.get("/ping",(req,res)=>{
    console.log("here");
    res.send("Pong")
})
app.use("/api/users",userRoute)
app.listen(PORT,()=>{
    console.log("server run in port : " + PORT);
    
})