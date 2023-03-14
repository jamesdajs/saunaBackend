import {Router}  from "express";
import * as entryService from "../services/entry.service"
import * as userService from "../services/user.service"
import * as customerService from "../services/customer.service"
import {roleVerify,getSesionId} from "../midelwares/auth.midelware"
const route = Router()

route.get("/:state",roleVerify(["user","admin"]) ,async (req,res)=>{
    try {
        const entrys = await entryService.getEntries(req.params.state==='true')
        res.status(200).json(entrys)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/getEntry/:id",roleVerify(["user","admin"]) ,async (req,res)=>{
    try {
        const entrys = await entryService.findEntry(parseInt(req.params.id),true)
        res.status(200).json(entrys)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["user","admin"]) ,async (req,res)=>{
    try {
        //console.log(req)
        req.body.user = await userService.findUser(getSesionId(req))
        req.body.customer = await customerService.findCustomer(parseInt(req.body.customerId))
        const entry = await entryService.createEntry(req.body)
        res.status(201).json(entry)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["user","admin"]) ,async (req,res)=>{
    try {
        const entry = await entryService.updateEntry(+req.params.id,req.body)
        res.status(201).json(entry)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["user","admin"]) ,async (req,res)=>{
    try {
        const entry = await entryService.deleteEntry(+req.params.id)
        res.status(201).json(entry)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route