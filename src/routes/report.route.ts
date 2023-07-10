import {Router}  from "express";
import * as entryService from "../services/entry.service"
import {roleVerify,getSesionId} from "../midelwares/auth.midelware"
import { Between } from "typeorm";
const route = Router()
function sumarDias(dias:number){
    const fecha = new Date()
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
route.get("/",roleVerify(["user","admin"]) ,async (req,res)=>{
    console.log(req.query);
    try {
        const dateIni = req.query.dateIni?new Date(req.query.dateIni+""):sumarDias(-30)
        const dateEnd = req.query.dateEnd?new Date(req.query.dateEnd+""):new Date()
        const dias = await entryService.getEntriesReport(dateIni,dateEnd)
        //console.log(dias);
        res.status(200).json(dias)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/:day",roleVerify(["user","admin"]) ,async (req,res)=>{
    console.log(req.query);
    try {
        const dias = await entryService.getEntriesReportDay(new Date(req.params.day))
        //console.log(dias);
        res.status(200).json(dias)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/detail/:day",roleVerify(["user","admin"]) ,async (req,res)=>{
    console.log(req.params);
    try {
        let dateIn = req.params.day?new Date(req.params.day):new Date()
        dateIn.setMinutes(dateIn.getMinutes() + dateIn.getTimezoneOffset())
        const detpro = await entryService.getEntriesReportDayProduct(dateIn)
        const detser = await entryService.getEntriesReportDayService(dateIn)
        console.log(dateIn);
        res.status(200).json({
            detail:detser,
            product:detpro
        })
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route