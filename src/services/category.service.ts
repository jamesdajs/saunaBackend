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
    const user = new Category()
    user.name = data.name
    await user.save()
    return user
}
export const updateCategory = async (id:number,data:Category)=>{
    let user = await findCategory(id)
    if (user){
        await Category.update({ id }, data)
        return await findCategory(id)
    }else throw new Error("usuario no encontrado")
}
export const deleteCategory = async (id:number)=>{
    let user = await findCategory(id)
    if (user){
        await Category.delete({ id })
        return user
    }else throw new Error("usuario no encontrado")
}