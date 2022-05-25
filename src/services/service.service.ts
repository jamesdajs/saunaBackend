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
    const user = new Service()
    user.name = data.name
    user.type = data.type
    await user.save()
    return user
}
export const updateService = async (id:number,data:Service)=>{
    let user = await findService(id)
    if (user){
        await Service.update({ id }, data)
        return await findService(id)
    }else throw new Error("usuario no encontrado")
}
export const deleteService = async (id:number)=>{
    let user = await findService(id)
    if (user){
        await Service.delete({ id })
        return user
    }else throw new Error("usuario no encontrado")
}