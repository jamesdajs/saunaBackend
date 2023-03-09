import {Entry} from "../entities/Entry"
export const getEntries = async ()=>{
    return await Entry.find()
}
export const findEntry = async (id:number)=>{
    return await Entry.findOne({
        
        where:{id}
    })
}
export const createEntry = async (data:Entry)=>{
    const user = new Entry()
    await user.save()
    return user
}
export const updateEntry = async (id:number,data:Entry)=>{
    let user = await findEntry(id)
    if (user){
        await Entry.update({ id }, data)
        return await findEntry(id)
    }else throw new Error("entrada no encontrado")
}
export const deleteEntry = async (id:number)=>{
    let user = await findEntry(id)
    if (user){
        await Entry.delete({ id })
        return user
    }else throw new Error("entrada no encontrado")
}