import {Product} from "../entities/Product"
export const getProducts = async ()=>{
    return await Product.find()
}
export const findProduct = async (id:number)=>{
    return await Product.findOne({
        
        where:{id}
    })
}
export const createProduct = async (data:Product)=>{
    const user = new Product()
    user.name = data.name
    await user.save()
    return user
}
export const updateProduct = async (id:number,data:Product)=>{
    let user = await findProduct(id)
    if (user){
        await Product.update({ id }, data)
        return await findProduct(id)
    }else throw new Error("usuario no encontrado")
}
export const deleteProduct = async (id:number)=>{
    let user = await findProduct(id)
    if (user){
        await Product.delete({ id })
        return user
    }else throw new Error("usuario no encontrado")
}