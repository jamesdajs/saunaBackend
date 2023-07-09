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
route.get("/:state",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const products = await productService.getProducts({state:req.params.state=="true"})
        res.status(200).json(products)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/category/:categoryId",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        console.log(req.params.categoryId)
        const category = await categoryService.findCategory(parseInt(req.params.categoryId),{products:true})
        //const products = await productService.getProducts({category:category})
        console.log(req.params.categoryId,category);
        res.status(200).json(category?.products)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["admin"]) ,async (req,res)=>{
    
    try {
        req.body.category = await categoryService.findCategory(parseInt(req.body.categoryId))
        console.log(req.body)
        const product = await productService.createProduct(req.body)
        res.status(200).json(product)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        if (req.body.categoryId)
             req.body.category = await categoryService.findCategory(parseInt(req.body.categoryId))
        console.log(req.body)
        const product = await productService.updateProduct(+req.params.id,req.body)
        res.status(200).json(product)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const product = await productService.deleteProduct(+req.params.id)
        res.status(201).json(product)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route