import {Entry} from "../entities/Entry"
export const getEntries = async (state:boolean)=>{
    return await Entry.find({
        relations:{
            user:true,
            customer:true
        },
        where:{state}
    })
}
export const findEntry = async (id:number,rel=false)=>{
    let relations = {}
    if (rel){
        relations={
            user:true,
            customer:true,
            details:{
                lockers:true,
                service:true
            },
            detailsProduct:{
                product:true
            }
        }
    }

    return await Entry.findOne({
        relations,
        where:{id}
    })
}
export const createEntry = async (data:Entry)=>{
    const entry = await Entry.create(data)
    await entry.save()
    return entry
}
export const updateEntry = async (id:number,data:Entry)=>{
    let entry = await findEntry(id,false)
    if (entry){
        await Entry.update({ id }, data)
        return await findEntry(id,false)
    }else throw new Error("entrada no encontrado")
}
export const deleteEntry = async (id:number)=>{
    let entry = await findEntry(id,false)
    if (entry){
        await Entry.delete({ id })
        return entry
    }else throw new Error("entrada no encontrado")
}