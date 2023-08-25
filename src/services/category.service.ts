import {Category} from "../entities/Category"
export const getCategories = async (query={})=>{
    return await Category.find({
        where:query
    })
}
export const findCategory = async (id:number,relations={},state=true)=>{
    return await Category.findOne({
        where:{id,state},
        relations
    })
   
}
export const createCategory = async (data:Category)=>{
    const categoty = await Category.create(data)
    await categoty.save()
    return categoty
}
export const updateCategory = async (id:number,data:Category)=>{
    let categoty = await findCategory(id)
    if (categoty){
        await Category.update({ id }, data)
        return await findCategory(id)
    }else throw new Error("categoria no encontrado")
}
export const deleteCategory = async (id:number)=>{
    let categoty = await findCategory(id)
    if (categoty){
        await Category.delete({ id })
        return categoty
    }else throw new Error("categoria no encontrado")
}