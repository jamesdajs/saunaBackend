import {DetailProduct} from "../entities/DetailProduct"
import { AppDataSource } from "../database/db"
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
export const getProductoReport = async (date1:Date,date2:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("pr.id")
    .addSelect('sum(dp."cant")',"cant")
    .addSelect('sum(dp."cant" * dp."price")',"total")
    .addSelect('pr."name"')
    .addSelect('ca."name"',"category")
    .from("detail_product","dp")
    .from("product","pr")
    .from("category","ca")
    .where('pr.id = dp."productId"')
    .andWhere('ca.id = pr."categoryId"')
    .andWhere("dp.state = '2'")
    .andWhere('dp."updateAt" BETWEEN :date1 AND :date2',{date1,date2})
    .groupBy("pr.id")
    .addGroupBy("ca.id")
    .getRawMany() 
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