import {Router}  from "express";
import * as userService from "../services/user.service"
import * as dataService from "../services/data.service"
const route = Router()

route.post("/singup", async (req,res)=>{
    const user = await userService.createUser(req.body.user)
    try {
        
        req.body.data.user = user
        const {username} = await dataService.createData(req.body.data)
        res.status(200).json({user,username})
    } catch (error) {
        if (error instanceof Error) {
            userService.deleteUser(user.id)
            res.status(500).json({message:error.message})
        }
    }
}).post("/singin", async (req,res)=>{
    try {
        const data = await dataService.loggin(req.body)
        res.status(200).json({message:"login correcto",data})
    } catch (error) {
        if (error instanceof Error) 
            res.status(406).json({message:error.message})
    }
})

export default route