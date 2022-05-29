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
    const user = new Customer()
    user.name = data.name
    await user.save()
    return user
}
export const updateCustomer = async (id:number,data:Customer)=>{
    let user = await findCustomer(id)
    if (user){
        await Customer.update({ id }, data)
        return await findCustomer(id)
    }else throw new Error("usuario no encontrado" )
}
export const deleteCustomer = async (id:number)=>{
    let user = await findCustomer(id)
    if (user){
        await Customer.delete({ id })
        return user
    }else throw new Error("usuario no encontrado")
}