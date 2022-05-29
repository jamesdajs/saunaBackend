import {Router}  from "express";
import * as customerService from "../services/customer.service"
import {roleVerify} from "../midelwares/auth.midelware"
const route = Router()

route.get("/",roleVerify(["user","admin"]) ,async (req,res)=>{
    try {
        const customers = await customerService.getCustomers()
        res.status(200).json(customers)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route