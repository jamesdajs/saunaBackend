import {Router}  from "express";
import * as detailService from "../services/detail.service"
import {roleVerify} from "../midelwares/auth.midelware"
import * as serviceService from "../services/service.service"
import * as lockerService from "../services/locker.service"
import * as entryService from "../services/entry.service"
const route = Router()

route.get("/",roleVerify(["admin","user"]) ,async (req,res)=>{
    try {
        const categories = await detailService.getDetailsService()
        res.status(200).json(categories)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/:id",roleVerify(["admin","user"]) ,async (req,res)=>{
    try {
        const categories = await detailService.findDetailService(parseInt(req.params.id))
        res.status(200).json(categories)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["admin","user"]) ,async (req,res)=>{
    try {
        const service = await serviceService.findService(parseInt(req.body.serviceId))
        const loker = await lockerService.findLocker(parseInt(req.body.lokerId))
        const entry = await entryService.findEntry(parseInt(req.body.entryId))
        req.body.service = service
        req.body.loker = loker
        req.body.entry = entry
        const detail = await detailService.createDetailService(req.body)
        res.status(201).json(detail)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["admin","user"]) ,async (req,res)=>{
    try {
        const detail = await detailService.updateDetailService(+req.params.id,req.body)
        res.status(201).json(detail)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["admin","user"]) ,async (req,res)=>{
    try {
        const detail = await detailService.deleteDetailService(+req.params.id)
        res.status(201).json(detail)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route