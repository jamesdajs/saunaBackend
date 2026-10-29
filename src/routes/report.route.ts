import {Router}  from "express";
import * as entryService from "../services/entry.service"
import * as detailProductService from "../services/detailProduct.servise"
import * as detailService from "../services/detail.service"
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
route.get("/product",roleVerify(["user","admin"]) ,async (req,res)=>{
    console.log(req.query);
    try {
        const dateIni = req.query.dateIni?new Date(req.query.dateIni+""):sumarDias(-30)
        const dateEnd = req.query.dateEnd?new Date(req.query.dateEnd+""):new Date()
        const dias = await detailProductService.getProductoReport(dateIni,dateEnd)
        //console.log(dias);
        res.status(200).json(dias)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/service",roleVerify(["user","admin"]) ,async (req,res)=>{
    console.log(req.query);
    try {
        const dateIni = req.query.dateIni?new Date(req.query.dateIni+""):sumarDias(-30)
        const dateEnd = req.query.dateEnd?new Date(req.query.dateEnd+""):new Date()
        const dias = await detailService.getServiceReport(dateIni,dateEnd)
        //console.log(dias);
        res.status(200).json(dias)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/customer",roleVerify(["user","admin"]) ,async (req,res)=>{
    console.log(req.query);
    try {
        const dateIni = req.query.dateIni?new Date(req.query.dateIni+""):sumarDias(-30)
        const dateEnd = req.query.dateEnd?new Date(req.query.dateEnd+""):new Date()
        const dias = await entryService.getEntriesCustomerReport(dateIni,dateEnd)
        //console.log(dias);
        res.status(200).json(dias)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/delivered-unpaid/:day",roleVerify(["user","admin"]) ,async (req,res)=>{
    try {
        const targetDate = new Date(`${req.params.day}T12:00:00`)
        if (Number.isNaN(targetDate.getTime())) {
            res.status(400).json({message:"Fecha inválida"})
            return
        }

        const products = await detailProductService.getDeliveredUnpaidProductsReport(targetDate)
        res.status(200).json(products)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message:error.message})
    }
})
route.get("/service",roleVerify(["user","admin"]) ,async (req,res)=>{
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
