import {DetailProduct} from "../entities/DetailProduct"
export const getDetailsService = async ()=>{
    return await DetailProduct.find({
        relations:{
            entry:true,
            
        },
        where:{entry:{id:1}}
        
    })
}
export const findDetailProduct = async (id:number)=>{
    return await DetailProduct.findOne({
        
        where:{id}
    })
   
}
export const createDetailProduct = async (data:DetailProduct)=>{
    const detailProduct = await DetailProduct.create(data)
    await detailProduct.save()
    return detailProduct
}
export const updateDetailProduct = async (id:number,data:any)=>{
    let detailProduct = await findDetailProduct(id)
    if (detailProduct){
        await DetailProduct.update({ id }, data)
        return await findDetailProduct(id)
    }else throw new Error("categoria no encontrado")
}
export const deleteDetailProduct = async (id:number)=>{
    let detailProduct = await findDetailProduct(id)
    if (detailProduct){
        await DetailProduct.delete({ id })
        return detailProduct
    }else throw new Error("categoria no encontrado")
}