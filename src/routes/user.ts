import express  from "express";
import * as service from "../services/userService"
const route = express.Router()

route.get("/",async (req,res)=>{
    try {
        const user = await service.getUsers()
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/:id",async (req,res)=>{
    try {
        const user = await service.findUser(+req.params.id)
        if (user)
            res.status(200).json(user)
        else res.status(401).json({message:"user not found"})
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/", async (req,res)=>{
    try {
        
        const user = await service.createUser(req.body)
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id", async (req,res)=>{
    try {
        
        const user = await service.updateUser(+req.params.id,req.body)
        if (user)
            res.status(200).json(user)
        else res.status(401).json({message:"user not found"})
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id", async (req,res)=>{
    try {
        
        const user = await service.deleteUser(+req.params.id)
        if (user)
            res.status(200).json(user)
        else res.status(401).json({message:"user not found"})
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route