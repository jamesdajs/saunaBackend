import {Router}  from "express";
import * as customerService from "../services/customer.service"
import {roleVerify} from "../midelwares/auth.midelware"
const route = Router()

route.get("/",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const customers = await customerService.getCustomers()
        res.status(200).json(customers)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        console.log(req)
        const customer = await customerService.createCustomer(req.body)
        res.status(201).json(customer)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const customer = await customerService.updateCustomer(+req.params.id,req.body)
        res.status(201).json(customer)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const customer = await customerService.deleteCustomer(+req.params.id)
        res.status(201).json(customer)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route