import {Locker} from "../entities/Locker"
export const getLockers = async ()=>{
    return await Locker.find()
}
export const findLocker = async (id:number)=>{
    return await Locker.findOne({
        
        where:{id}
    })
}
export const createLocker = async (data:Locker)=>{
    const locker = await Locker.create(data)
    await locker.save()
    return locker
}
export const updateLocker = async (id:number,data:Locker)=>{
    let locker = await findLocker(id)
    if (locker){
        await Locker.update({ id }, data)
        return await findLocker(id)
    }else throw new Error("Casillero no encontrado" )
}
export const deleteLocker = async (id:number)=>{
    let locker = await findLocker(id)
    if (locker){
        await Locker.delete({ id })
        return locker
    }else throw new Error("Casillero no encontrado")
}