import {Router}  from "express";
import * as userService from "../services/user.service"
import * as dataService from "../services/data.service"
const route = Router()

route.get("/",async (req,res)=>{
    try {
        const user = await userService.getUsers()
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/:id",async (req,res)=>{
    try {
        const user = await userService.findUser(+req.params.id)
        if (user)
            res.status(200).json(user)
        else res.status(401).json({message:"user not found"})
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
/*
.post("/", async (req,res)=>{
    try {
        
        const user = await userService.createUser(req.body.user)
        req.body.data.user = user
        const {username} = await dataService.createData(req.body.data)
        res.status(200).json({user,username})
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})*/
.put("/:id", async (req,res)=>{
    try {
        
        const user = await userService.updateUser(+req.params.id,req.body)
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
        
        const user = await userService.deleteUser(+req.params.id)
        if (user)
            res.status(200).json(user)
        else res.status(401).json({message:"user not found"})
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route