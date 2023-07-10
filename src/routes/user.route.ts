import { Router } from "express";
import * as userService from "../services/user.service"
import * as dataService from "../services/data.service"
import * as roleService from "../services/role.service"
const route = Router()

route.get("/", async (req, res) => {
    try {
        const user = await userService.getUsers()
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
})
route.get("/role", async (req, res) => {
    try {
        const role = await roleService.getRoles()
        res.status(200).json(role)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message })
    }
})
route.get("/:id", async (req, res) => {
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

    .post("/", async (req, res) => {
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
                res.status(401).json({ message: "El nombre de usuario ya existe" })
            }
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ message: error.message })
        }
    })
    .put("/:id", async (req, res) => {
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
    .delete("/:id", async (req, res) => {
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
export default route