import {Customer} from "../entities/Customer"
import { AppDataSource } from "../database/db"
export const getCustomers = async ()=>{
    return await Customer.find()
}
export const findCustomer = async (id:number)=>{
    return await Customer.findOne({
        where:{id}
    })
}
export const findCustomerEntry = async (id:number)=>{
    return await Customer.findOne({
        where:{id},
        relations:{
            entries:true
        },
    })
}

export const findCustomerEntryDate =  async (id:number,date1:Date,date2:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("e.*")
    .from('entry','e')
    .where('e."customerId" = :id',{id})
    .andWhere('e."dateIn" BETWEEN :date1 AND :date2',{date1,date2})
    .getRawMany() 
}
export const createCustomer = async (data:Customer)=>{
    const customer = await Customer.create(data)
    await customer.save()
    return customer
}
export const updateCustomer = async (id:number,data:Customer)=>{
    let customer = await findCustomer(id)
    if (customer){
        await Customer.update({ id }, data)
        return await findCustomer(id)
    }else throw new Error("usuario no encontrado" )
}
export const deleteCustomer = async (id:number)=>{
    let customer = await findCustomer(id)
    if (customer){
        await Customer.delete({ id })
        return customer
    }else throw new Error("usuario no encontrado")
}