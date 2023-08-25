import {Router}  from "express";
import * as lockerService from "../services/locker.service"
import {roleVerify} from "../midelwares/auth.midelware"
const route = Router()

route.get("/",roleVerify(["user","admin","receptionist"]) ,async (req,res)=>{
    try {
        const lockers = await lockerService.getLockers()
        res.status(200).json(lockers)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/list/:state",roleVerify(["user","admin","receptionist"]) ,async (req,res)=>{
    try {
        const lockers = await lockerService.getLockers({taken:req.params.state == "false",state:true})
        res.status(200).json(lockers)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["user","admin","receptionist"]) ,async (req,res)=>{
    try {
        console.log(req.body)
        const locker = await lockerService.createLocker(req.body)
        res.status(201).json(locker)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["user","admin","receptionist"]) ,async (req,res)=>{
    try {
        const locker = await lockerService.updateLocker(+req.params.id,req.body)
        res.status(201).json(locker)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["user","admin","receptionist"]) ,async (req,res)=>{
    try {
        const locker = await lockerService.deleteLocker(+req.params.id)
        res.status(201).json(locker)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route