import {User} from "../entities/User"
export const getUsers = async ()=>{
    return await User.find()
}
export const findUser = async (id:number)=>{
    return await User.findOneBy({id})
}
export const createUser = async (data:User)=>{
    const user = new User()
    user.name = data.name
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