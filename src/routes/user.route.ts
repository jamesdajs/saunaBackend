import { Router } from "express";
import * as userService from "../services/user.service"
import * as dataService from "../services/data.service"
import * as roleService from "../services/role.service"
import * as utilService from "../services/util.service"

import {roleVerify,getSesionId} from "../midelwares/auth.midelware"
function sumarDias(dias:number){
    const fecha = new Date()
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
const route = Router()

route.get("/",roleVerify(["user","admin"]), async (req, res) => {
    try {
        
        const user = await userService.getUsers()
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
})
route.get("/entry/:id",roleVerify(["user","admin","receptionist","delivery"]) ,async (req,res)=>{
    try {
        console.log(req.query)
        const customers = await userService.findUserEntry(parseFloat(req.params.id))
        if (req.query.dateIni && req.query.dateEnd){
            const dateIni = req.query.dateIni?new Date(req.query.dateIni+""):sumarDias(-30)
            const dateEnd = req.query.dateEnd?new Date(req.query.dateEnd+""):new Date()
            customers!.entries = await userService.findUserEntryDate(parseInt(req.params.id),dateIni,dateEnd) as any
        }
        
        res.status(200).json(customers)
    } catch (error) {
        if (error instanceof Error) 
            res.status(500).json({message:error.message})
    }
})
route.get("/backup", async (req, res) => {
    try {
        const data = await utilService.createBackup("user")
        res.json({data})
    }catch (error) {
        console.log(error);
        
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
})
route.get("/me",roleVerify(["user","admin","receptionist","delivery"]), async (req, res) => {
    try {
        let id = getSesionId(req)
        const user = await userService.findUser(id)
        if (user)
            res.status(200).json(user)
        else res.status(401).json({ message: "user not found" })
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
})
route.get("/role",roleVerify(["user","admin"]), async (req, res) => {
    try {
        const role = await roleService.getRoles()
        res.status(200).json(role)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
})
route.get("/:id",roleVerify(["user","admin"]), async (req, res) => {
    try {
        const user = await userService.findUser(+req.params.id)
        if (user)
            res.status(200).json(user)
        else res.status(401).json({ message: "user not found" })
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
})

    .post("/",roleVerify(["user","admin"]), async (req, res) => {
        try {
            console.log(req.body)
            const data = await dataService.find({ username: req.body.username })
            if (!data) {
                const role = await roleService.findRole(req.body.role)
                req.body.role = role
                const user = await userService.createUser(req.body)

                const usercreate = await userService.findUser(user.id)

                let newData:any = {
                    username: req.body.username,
                    password: req.body.password,
                    user: usercreate
                }
                const { username } = await dataService.createData(newData)
                res.status(200).json({ user, username })
            }
            else {
                res.status(409).json({ message: "El nombre de usuario ya existe" })
            }
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ message: error.message })
        }
    })
    .put("/:id",roleVerify(["user","admin"]), async (req, res) => {
        try {

            const user = await userService.updateUser(+req.params.id, req.body)
            if (user)
                res.status(200).json(user)
            else res.status(401).json({ message: "user not found" })
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ message: error.message })
        }
    })
    .put("/data/:id",roleVerify(["user","admin"]), async (req, res) => {
        try {

            const user = await dataService.updateData(+req.params.id, req.body)
            if (user)
                res.status(200).json(user)
            else res.status(401).json({ message: "user not found" })
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ message: error.message })
        }
    })
    .delete("/:id",roleVerify(["user","admin"]), async (req, res) => {
        try {

            const user = await userService.deleteUser(+req.params.id)
            if (user)
                res.status(200).json(user)
            else res.status(401).json({ message: "user not found" })
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ message: error.message })
        }
    })
    route.get("/backup", async (req, res) => {
        try {
           // const data = await utilService.createBackup()
            res.json({data:"hola"})
        }catch (error) {
            console.log(error);
            
            if (error instanceof Error)
                res.status(500).json({ message: error.message })
        }
    })
export default route