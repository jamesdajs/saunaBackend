import {DetailService} from "../entities/DetailService"
export const getCategories = async ()=>{
    return await DetailService.find({
        relations:{
            entry:true,
            
        },
        where:{entry:{id:1}}
        
    })
}
export const findDetailService = async (id:number)=>{
    return await DetailService.createQueryBuilder("category")
    .where("category.id = :id", { id })
    .getOne()
   
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