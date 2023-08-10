import {Router}  from "express";
import * as categoryService from "../services/category.service"
import {roleVerify} from "../midelwares/auth.midelware"
const route = Router()

route.get("/",roleVerify(["admin","user","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const categories = await categoryService.getCategories()
        res.status(200).json(categories)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/list/:state",roleVerify(["admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const categories = await categoryService.getCategories({state:req.params.state})
        res.status(200).json(categories)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/:id",roleVerify(["admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        const categories = await categoryService.findCategory(parseInt(req.params.id))
        res.status(200).json(categories)
        
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.post("/",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const category = await categoryService.createCategory(req.body)
        res.status(201).json(category)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.put("/:id",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const category = await categoryService.updateCategory(+req.params.id,req.body)
        res.status(201).json(category)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
.delete("/:id",roleVerify(["admin"]) ,async (req,res)=>{
    try {
        const category = await categoryService.deleteCategory(+req.params.id)
        res.status(201).json(category)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
export default route