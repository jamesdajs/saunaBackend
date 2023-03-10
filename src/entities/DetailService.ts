import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Entry } from "./Entry"
import { Locker } from "./Locker"
import { Service } from "./Service"

@Entity()
export class DetailService extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    cant : number
    @Column()
    price : number
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date

    @ManyToOne(()=> Entry,(entry)=>entry.details)
    entry :Entry
    @ManyToOne(()=> Service,(service)=>service.details)
    service :Service
    @ManyToMany(() => Locker, (locker) => locker.details)
    @JoinTable()
    lockers: Locker[]
}