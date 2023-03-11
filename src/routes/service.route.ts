import {Router}  from "express";
import * as serviceService from "../services/service.service"
import {roleVerify} from "../midelwares/auth.midelware"
const route = Router()

route.get("/",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const services = await serviceService.getServices()
        res.status(200).json(services)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.get("/list/:state",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const services = await serviceService.getServices({state:req.params.state=='true'})
        res.status(200).json(services)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/:id",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const services = await serviceService.findService(parseInt(req.params.id))
        res.status(200).json(services)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const service = await serviceService.createService(req.body)
        res.status(201).json(service)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const service = await serviceService.updateService(+req.params.id,req.body)
        res.status(201).json(service)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const service = await serviceService.deleteService(+req.params.id)
        res.status(201).json(service)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route