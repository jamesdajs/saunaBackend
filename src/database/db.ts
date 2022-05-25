import {DataSource} from "typeorm"
import { Category } from "../entities/Category"
import { Customer } from "../entities/Customer"
import { Data } from "../entities/Data"
import { DetailProduct } from "../entities/DetailProduct"
import { DetailService } from "../entities/DetailService"
import { Entry } from "../entities/Entry"
import { Locker } from "../entities/Locker"
import { Product } from "../entities/Product"
import { Role } from "../entities/Role"
import { Service } from "../entities/Service"
import { User } from "../entities/User"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "template",
    synchronize: true,
    //logging: true,
    entities: [
        User,
        Data,
        Customer,
        Role,
        Category,
        Product,
        Entry,
        Service,
        DetailService,
        DetailProduct,
        Locker
    ],
    //subscribers: [],
    //migrations: [],
})