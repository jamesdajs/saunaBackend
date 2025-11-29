import dotenv from "dotenv"
dotenv.config()
import express from 'express'
import {AppDataSource} from "./database/db"
import userRoute from './routes/user.route'
import authRoute from './routes/auth.route'
import customerRoute from './routes/customer.route'
import categoryRoute from './routes/category.route'
import productRoute from './routes/product.route'
import uploadRoute from './routes/upload.route'
import lockerRoute from './routes/locker.route' 
import serviceRoute from './routes/service.route'
import entryRoute from './routes/entry.route' 
import detailRoute from './routes/detail.route' 
import detailProductRoute from './routes/detailProduct.route' 
import reportRoute from './routes/report.route' 
import cron from 'node-cron'

import cors  from 'cors';
import { Role } from "./entities/Role"

import { User } from "./entities/User"
import { Data } from "./entities/Data"
import * as userService from "./services/user.service"
import * as dataService from "./services/data.service"
import "reflect-metadata"

import * as utilService from './services/util.service' 
import path from 'node:path'
const app = express()

const allowedOrigins = ['http://localhost:4200','http://localhost:4100','*'];

cron.schedule('0 1 1 * *', async () => {
    let backup = await utilService.createBackup("default");
    console.log('cada minuto',backup);
});
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
app.use('/uploads', express.static(uploadsPath));
app.use(express.json())
const PORT = process.env.PORT || 3000
app.use(express.static('public'));
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/customers",customerRoute)
app.use("/api/products",productRoute)
app.use("/api/categories",categoryRoute)
app.use("/api/upload",uploadRoute)
app.use("/api/lockers",lockerRoute)
app.use("/api/services",serviceRoute)
app.use("/api/entries",entryRoute)
app.use('/api/details',detailRoute)
app.use('/api/detailproduct',detailProductRoute)
app.use('/api/reports',reportRoute)

// Ruta para subir imágenes
async function seedRoles() {
    const roleRepository = AppDataSource.getRepository(Role);

    // 1. Define los roles que quieres insertar
    const initialRoles = [
        { name: "admin", showname: "Administrador" },
        { name: "user", showname: "Usuario" },
        { name: "receptionist", showname: "Resepcionista" },
        { name: "delivery", showname: "Repartidor" }
    ];

    for (const roleData of initialRoles) {
        // 2. Verifica si el rol ya existe por el nombre
        const existingRole = await roleRepository.findOne({ 
            where: { name: roleData.name } 
        });

        // 3. Si no existe, créalo e insértalo
        if (!existingRole) {
            const newRole = roleRepository.create(roleData);
            await roleRepository.save(newRole);
            console.log(`Rol inicial insertado: ${roleData.name}`);
        }
    }
}
async function createAdminUser(){
    const userdata:any =  {
        name: "Sauna",
        ci: "Admin",
        phone: "00000000",
        birthdate: new Date(),
        gender: 0,
        observation: "Usuario administrador",
        state: true,
        role: await AppDataSource.getRepository(Role).findOneBy({name:"admin"})
    }
    const existingUser = await AppDataSource.getRepository(Data).findOne({ 
        where: { username: "admin" } 
    });
    if(!existingUser) {
        const user = await userService.createUser(userdata)
        try {
        const dataData: any = {
                username: "admin",
                password: "admin71216",
                user: user
            }
            
            const {username} = await dataService.createData(dataData)
            console.log("Usuario admin creado con username: " + username)
        } catch (error) {
            if (error instanceof Error) {
                userService.deleteUser(user.id)
            }
        }
    }
}
app.get('/api', (req:any, res:any) => {
    res.send('Welcome to the API server!');
});
const main = async ()=>{
    try {
        await AppDataSource.initialize()
        await seedRoles()
        await createAdminUser()
        app.listen(PORT,()=>{
            console.log("server run in port : " + PORT);
        })
    } catch (error) {
        console.error(error)
    }
}
main()