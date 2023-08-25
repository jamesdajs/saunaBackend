import {Router}  from "express";
import * as entryService from "../services/entry.service"
import * as userService from "../services/user.service"
import * as customerService from "../services/customer.service"
import * as lokerService from "../services/locker.service"
import {roleVerify,getSesionId} from "../midelwares/auth.midelware"
const route = Router()

route.get("/:state",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        console.log("get");
        const entrys = await entryService.getEntries({state:req.params.state==='true'})
        res.status(200).json(entrys)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/clientes/count",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        console.log("countperson");
        
        const cantPerson = await entryService.getCantCustomerReportDay(new Date)
        res.status(200).json(cantPerson)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/outentry/:id",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const entrys = await entryService.findEntry(parseInt(req.params.id),true)
        //lipiar casilleros
        entrys!.details.map(t => {
            t.lockers.map(async l => {
                await lokerService.updateLocker(l.id,{
                    taken:false
                })
            })
        })
        //calcular total
        const cant1 = entrys!.details.map(t => t.price*t.cant).reduce((acc, value) => acc + value, 0);

        const cant2 = entrys!.detailsProduct.map(t => {
              if(t.state == 2)
                return t.price*t.cant
              return 0
            }).reduce((acc, value) => acc + value, 0);
        
        const entryres = await entryService.updateEntry(parseInt(req.params.id),{
            total:cant1+cant2,
            dateOut:new Date(),
            state:false
        })

        res.status(200).json(entryres)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/getEntry/:id",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const entrys = await entryService.findEntry(parseInt(req.params.id),true)
        res.status(200).json(entrys)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
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
.put("/:id",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const entry = await entryService.updateEntry(+req.params.id,req.body)
        res.status(201).json(entry)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const entry = await entryService.deleteEntry(+req.params.id)
        res.status(201).json(entry)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})

export default route