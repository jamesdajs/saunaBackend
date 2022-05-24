import {Role} from "../entities/Role"
export const getRoles = async ()=>{
    return await Role.find()
}
export const findRole = async (id:number)=>{
    return await Role.findOne({
        
        where:{id}
    })
}
export const createRole = async (data:Role)=>{
    const user = new Role()
    user.name = data.name
    await user.save()
    return user
}
export const updateRole = async (id:number,data:Role)=>{
    let user = await findRole(id)
    if (user){
        await Role.update({ id }, data)
        return await findRole(id)
    }else throw new Error("rol no encontrado")
}
export const deleteRole = async (id:number)=>{
    let user = await findRole(id)
    if (user){
        await Role.delete({ id })
        return user
    }else throw new Error("rol no encontrado")
}