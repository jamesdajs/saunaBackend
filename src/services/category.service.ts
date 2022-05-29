import {Category} from "../entities/Category"
export const getCategories = async ()=>{
    return await Category.find()
}
export const findCategory = async (id:number)=>{
    return await Category.findOne({
        
        where:{id}
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
    }else throw new Error("usuario no encontrado")
}
export const deleteCategory = async (id:number)=>{
    let categoty = await findCategory(id)
    if (categoty){
        await Category.delete({ id })
        return categoty
    }else throw new Error("usuario no encontrado")
}