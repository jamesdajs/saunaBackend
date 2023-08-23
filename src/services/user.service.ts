import {User} from "../entities/User"
import { AppDataSource } from "../database/db"
export const getUsers = async ()=>{
    return await User.find({
        relations: {
            data: true,
            role: true
        }
    })
}
export const findUser = async (id:number)=>{
    return await User.findOne({
        relations: {
            data: true,
            role:true
        },
        where:{id}
    })
}
export const findUserEntry = async (id:number)=>{
    return await User.findOne({
        relations: {
            entries: {
                customer:true
            }
        },
        where:{id}
    })
}

export const findUserEntryDate =  async (id:number,date1:Date,date2:Date)=>{
    return await AppDataSource.createQueryBuilder()
    .select("e.*")
    .addSelect("cu.name","name")
    .from('entry','e')
    .from('customer','cu')
    .where('e."customerId" = cu.id')
    .andWhere('e."userId" = :id',{id})
    .andWhere('e."dateIn" BETWEEN :date1 AND :date2',{date1,date2})
    .getRawMany() 
}
export const createUser = async (data:User)=>{
    const user = await User.create(data)
    await user.save()
    return user
}
export const updateUser = async (id:number,data:User)=>{
    let user = await findUser(id)
    if (user){
        await User.update({ id }, data)
        return await findUser(id)
    }else return null
}
export const deleteUser = async (id:number)=>{
    let user = await findUser(id)
    if (user){
        await User.delete({ id })
        return user
    }else return null
}