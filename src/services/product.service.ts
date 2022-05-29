import {Product} from "../entities/Product"
export const getProducts = async ()=>{
    return await Product.find({
        relations:{
            category:true
        }
    })
}
export const findProduct = async (id:number)=>{
    return await Product.findOne({
        
        where:{id}
    })
}
export const createProduct = async (data:Product)=>{
    const product = Product.create(data)
    return await product.save()
}
export const updateProduct = async (id:number,data:Product)=>{
    let product = await findProduct(id)
    if (product){
        await Product.update({ id }, data)
        return await findProduct(id)
    }else throw new Error("usuario no encontrado")
}
export const deleteProduct = async (id:number)=>{
    let product = await findProduct(id)
    if (product){
        await Product.delete({ id })
        return product
    }else throw new Error("usuario no encontrado")
}