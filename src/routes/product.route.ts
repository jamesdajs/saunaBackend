import {Router}  from "express";
import * as categoryService from "../services/category.service"
import * as productService from "../services/product.service"
import {roleVerify} from "../midelwares/auth.midelware"
const route = Router()

route.get("/",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const products = await productService.getProducts()
        res.status(200).json(products)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        req.body.category = await categoryService.findCategory(req.body.categotyId)
        const product = await productService.createProduct(req.body)
        res.status(200).json(product)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route