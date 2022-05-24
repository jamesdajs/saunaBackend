import {DataSource} from "typeorm"
import { Customer } from "../entities/Customer"
import { Data } from "../entities/Data"
import { Role } from "../entities/Role"
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
    entities: [User,Data,Customer,Role],
    //subscribers: [],
    //migrations: [],
})