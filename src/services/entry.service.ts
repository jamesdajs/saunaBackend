import { AppDataSource } from "../database/db"
import {Entry} from "../entities/Entry"
export const getEntries = async (where={})=>{
    return await Entry.find({
        relations:{
            user:true,
            customer:true
        },
        where
    })
}
export const getEntriesReport = async (date1:Date,date2:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("SUM(e.total)","total")
    .addSelect(`to_date(e."dateIn"::text,'YYYY-MM-DD')`,"yt")
    .from("entry","e")
    .where("e.dateIn BETWEEN :date1 AND :date2",{date1,date2})
    .groupBy("yt")
    //.addGroupBy("e.id")
    .getRawMany() 
}

export const getEntriesCustomerReport = async (date1:Date,date2:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("cu.id")
    .addSelect('cu.ci')
    .addSelect('cu.name')
    .addSelect('sum(e.total)',"total")
    .from("customer","cu")
    .from('entry','e')
    .where('cu.id = e."customerId"')
    .andWhere('e."dateIn" BETWEEN :date1 AND :date2',{date1,date2})
    .groupBy("cu.id")
    .getRawMany() 
}
export const getEntriesReportDay = async (date1:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("e.*")
    .addSelect("c.name","name")
    .from("entry","e")
    .from("customer","c")
    .where(`to_date(e."dateIn"::text,'YYYY-MM-DD') = to_date(:date1 :: text,'YYYY-MM-DD') `,{date1})
    .andWhere('c.id = e."customerId"')
    .groupBy("c.name")
    .addGroupBy("e.id")
    .getRawMany() 
}
export const getEntriesReportDayProduct = async (date1:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("pr.*")
    .addSelect("sum(dp.cant)","cant")
    .addSelect("max(dp.price)","price")
    .addSelect("c.name","type")
    .from("entry","e")
    .from("product","pr")
    .from("detail_product","dp")
    .from("category","c")
    .where(`to_date(e."dateIn" :: text,'YYYY-MM-DD') = to_date(:date1 :: text,'YYYY-MM-DD') `,{date1})
    .andWhere('e.id = dp."entryId"')
    .andWhere('pr.id = dp."productId"')
    .andWhere('c.id = pr."categoryId"')
    .andWhere('dp.state = 2')
    .groupBy("pr.id")
    .addGroupBy("pr.name")
    .addGroupBy("c.name")
    .getRawMany()
}
export const getEntriesReportDayService = async (date1:Date)=>{
    return await AppDataSource.createQueryBuilder() 
    .select("s.*")
    .addSelect("sum(ds.cant)","cant")
    .addSelect("max(ds.price)","price")
    .from("entry","e")
    .from("service","s")
    .from("detail_service","ds")
    .where(`to_date(e."dateIn" :: text,'YYYY-MM-DD') = to_date(:date1 :: text,'YYYY-MM-DD') `,{date1})
    .andWhere('e.id = ds."entryId"')
    .andWhere('s.id = ds."serviceId"')
    .groupBy("s.id")
    .addGroupBy("s.name")
    .getRawMany() 
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
export const updateEntry = async (id:number,data={})=>{
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