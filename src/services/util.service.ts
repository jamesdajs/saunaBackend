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
export const restoreBackup = (filePath:string) => {
    return new Promise((resolve, reject) => {
        exec(`PGPASSWORD="${process.env.DB_PASSWORD}" pg_restore -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -c ${filePath}`, (error: ExecException | null) => {
            if (error) {
                reject(error)
            }
            resolve("backup restored")
        })
})
}
export const deleteBackup = (filePath:string) => {
    return new Promise((resolve, reject) => {
        exec(`rm ${filePath}`, (error: ExecException | null) => {
            if (error) {
                reject(error)
            }
            resolve("backup deleted")
        })
})
}   
import { toZonedTime, format } from 'date-fns-tz';

const TARGET_TIMEZONE = 'America/La_Paz';
const UTC_TIMEZONE = 'UTC';

export const getCurrentBoliviaTimeForDB = (now = new Date()): Date => {

    const laPazTime = toZonedTime(now, TARGET_TIMEZONE);
    return laPazTime;
}
export const getcurrentDateUTCForDB = (): Date => {
    const utcTime = toZonedTime(new Date(), UTC_TIMEZONE);
    return utcTime
}
export const formatDateToBolivia = (date:Date, dateFormat:string) : string => {
    return format(toZonedTime(date, TARGET_TIMEZONE), dateFormat, { timeZone: TARGET_TIMEZONE });
}
export const formatDateToUTC = (date:Date, dateFormat:string) : string => {
    return format(toZonedTime(date, UTC_TIMEZONE), dateFormat, { timeZone: UTC_TIMEZONE });
}
export const getTodayEntriesInLocalTime =(targetDate: Date = new Date()) => {
    targetDate.setHours(0, 0, 0, 0);
    const startOfDay = getCurrentBoliviaTimeForDB(targetDate);
    targetDate.setHours(23, 59, 59, 999);
    const endOfDay = getCurrentBoliviaTimeForDB(targetDate);

    return { startOfDay, endOfDay };
}


