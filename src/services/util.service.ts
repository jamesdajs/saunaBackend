//const { exec } = require('node:child_process');
import { exec ,ExecException} from "node:child_process"

import path from 'path'
export const createBackup = (name:string) => {
    return new Promise((resolve, reject) => {
        const date = new Date();
        
        const currentDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${date.getHours()}.${date.getMinutes()}`;
        const fileName = `backup-${name}-${currentDate}.sql`;
        const rutaImagen =path.resolve(__dirname ,'../../backups/',fileName );
        console.log(rutaImagen);
        exec(`PGPASSWORD="${process.env.DB_PASSWORD}" pg_dump -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -f ${rutaImagen} -F t`, (error: ExecException | null) => {
            if (error) {
                reject(error)
            }
            resolve("backup created")
        })
})
}