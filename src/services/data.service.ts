import {Data} from "../entities/Data"
import jwt from "jsonwebtoken"
import bcript from"bcryptjs"
export const getDatas = async ()=>{
    return await Data.find()
}
export const findData = async (id:number)=>{
    return await Data.findOne({
        relations: {
            user: {
                role:true
            },
        },
        where:{id}
    })
}
export const find = async (where={})=>{
    return await Data.findOne({
        relations: {
            user: {
                role:true
            },
        },
        where
    })
}
export const createData = async (body:Data)=>{

    const data = new Data()
    data.username = body.username
    data.password = await encryptPassword(body.password)
    data.user = body.user
    await data.save()
    return data
}
export const updateData = async (id:number,body:Data)=>{
    let data = await findData(id)
    if (data){
        await Data.update({ id }, body)
        return await findData(id)
    }else return null
}
export const deleteData = async (id:number)=>{
    let data = await findData(id)
    if (data){
        await Data.delete({ id })
        return data
    }else return null
}
export const loggin = async (body:Data)=>{
    let data = await Data.findOne({
        relations: {
            user: {
                role:true
            },
        },
        where:{username:body.username}
    })
    if (data){
        if(await validatePassword(body.password,data.password)){
            console.log(data);
            
            const token = jwt.sign({id:data.user.id,role:data.user.role.name},process.env.SECRET_KEY || "ejemplo",{expiresIn:60*60*24})
            return {user:data.user,token}
        }else{
            throw new Error("password incorrecto")
        }
    }else{
        throw new Error("usuario o password no valido")
    }
}
const encryptPassword = async (password:string)=>{
    const salt = await bcript.genSalt(+(process.env.SKIPS_PASSWORD || 10))
    return bcript.hash(password,salt)
}
const validatePassword = async (password:string,hash:string)=>{
    return await bcript.compare(password,hash)
}