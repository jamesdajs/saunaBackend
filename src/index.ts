import express from 'express'

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
import {AppDataSource} from "./database/db"
import dotenv from "dotenv"
import "reflect-metadata"

import * as utilService from './services/util.service' 
dotenv.config()
const app = express()

const allowedOrigins = ['http://localhost:4200'];

cron.schedule('* * 0 * * *', async () => {
    let backup = await utilService.createBackup("default");
    console.log('cada minuto',backup);
});
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

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


const main = async ()=>{
    try {
        await AppDataSource.initialize()
        app.listen(PORT,()=>{
            console.log("server run in port : " + PORT);
        })
    } catch (error) {
        console.error(error)
    }
}
main()