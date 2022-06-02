import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken"

interface Ipayload  { id: number, role: string, iat: number, exp: number }
export const tokenValidation = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization 
    if ( !token){
        return res.status(500).json({message:"Acces Danied"})
    }
    const payload = jwt.verify(token,process.env.SECRET_KEY || "ejemplo")
    console.log(payload);
    next()
    
}
export const roleVerify = (role:string[]) =>(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const token = req.headers.authorization 
        if ( !token){
            return res.status(401).json({message:"Acces Danied"})
        }
        const payload = jwt.verify(token,process.env.SECRET_KEY || "ejemplo") as Ipayload
        //console.log(payload);
        if (!role.includes(payload.role)) {
            return res.status(403).json({message:"Acces Danied"})
        }
        next()
    } catch (error) {
            if(error instanceof Error)
                return res.status(401).json({message:error.message})
    }
    
}