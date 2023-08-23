import {DetailService} from "../entities/DetailService"

import { AppDataSource } from "../database/db"
export const getDetailsService = async ()=>{
    return await DetailService.find({
        relations:{
            entry:true,
            
        },
        where:{entry:{id:1}}
        
    })
}
export const findDetailService = async (id:number)=>{
    return await DetailService.findOne({
        
        where:{id}
    })
   
}
export const getServiceReport = async (date1:Date,date2:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("s.id","id")
    .addSelect('sum(dp."cant")',"cant")
    .addSelect('sum(dp."cant" * dp."price")',"total")
    .addSelect('s."name"')
    .from("detail_service","dp")
    .from("service","s")
    .where('s.id = dp."serviceId"')
    .andWhere('dp."updateAt" BETWEEN :date1 AND :date2',{date1,date2})
    .groupBy("s.id")
    .getRawMany() 
}
export const createDetailService = async (data:DetailService)=>{
    const detailServiceService = await DetailService.create(data)
    await detailServiceService.save()
    return detailServiceService
}
export const updateDetailService = async (id:number,data:DetailService)=>{
    let detailServiceService = await findDetailService(id)
    if (detailServiceService){
        await DetailService.update({ id }, data)
        return await findDetailService(id)
    }else throw new Error("categoria no encontrado")
}
export const deleteDetailService = async (id:number)=>{
    let detailServiceService = await findDetailService(id)
    if (detailServiceService){
        await DetailService.delete({ id })
        return detailServiceService
    }else throw new Error("categoria no encontrado")
}