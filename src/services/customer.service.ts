import {Customer} from "../entities/Customer"
export const getCustomers = async ()=>{
    return await Customer.find()
}
export const findCustomer = async (id:number)=>{
    return await Customer.findOne({
        
        where:{id}
    })
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