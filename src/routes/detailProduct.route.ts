import {Router}  from "express";
import * as detailProductService from "../services/detailProduct.servise"
import {roleVerify} from "../midelwares/auth.midelware"
import * as productService from "../services/product.service"
import * as entryService from "../services/entry.service"
import { DetailProduct } from "../entities/DetailProduct";
const route = Router()

route.get("/",roleVerify(["admin","user","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const detail = await detailProductService.getDetailsService()
        res.status(200).json(detail)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.get("/:id",roleVerify(["admin","user","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const detail = await detailProductService.findDetailProduct(parseInt(req.params.id))
        res.status(200).json(detail)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
/*.post("/change/",roleVerify(["admin","user","deliverer","receptionist"]) ,async (req,res)=>{
    try {
        const body = {state:req.body.state}
        const detail = await detailProductService.updateDetailProduct(+req.body.id,body)
        res.status(200).json(detail)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})*/
.post("/",roleVerify(["admin","user","receptionist","delivery"]) ,async (req,res)=>{
    try {
        //console.log(req.body)
  
        const product = await productService.findProduct(parseInt(req.body.productId))
        const entry = await entryService.findEntry(parseInt(req.body.entryId),false)
        req.body.entry = entry
        req.body.product = product
        //console.log(req.body)
        const detail = await detailProductService.createDetailProduct(req.body)
        console.log(detail)
        res.status(201).json(detail)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["admin","user","deliverer","receptionist"]) ,async (req,res)=>{
    try {
        const detail = await detailProductService.updateDetailProduct(+req.params.id,req.body)
        res.status(201).json(detail)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["admin","user","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const detail = await detailProductService.deleteDetailProduct(+req.params.id)
        res.status(201).json(detail)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route