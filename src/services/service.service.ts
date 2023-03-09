import {Service} from "../entities/Service"
export const getServices = async ()=>{
    return await Service.find()
}
export const findService = async (id:number)=>{
    return await Service.findOne({
        
        where:{id}
    })
}
export const createService = async (data:Service)=>{
    const service = await Service.create(data)
    await service.save()
    return service
}
export const updateService = async (id:number,data:Service)=>{
    let service = await findService(id)
    if (service){
        await Service.update({ id }, data)
        return await findService(id)
    }else throw new Error("usuario no encontrado")
}
export const deleteService = async (id:number)=>{
    let service = await findService(id)
    if (service){
        await Service.delete({ id })
        return service
    }else throw new Error("usuario no encontrado")
}