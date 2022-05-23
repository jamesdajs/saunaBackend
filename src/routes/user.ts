import express  from "express";
import * as service from "../services/userService"
const route = express.Router()

route.get("/",(req,res)=>{
    res.send(service.getUser())
})
.post("/",(req,res)=>{
    res.send("resp")
})
export default route