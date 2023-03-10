import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Entry } from "./Entry"
import { Product } from "./Product"
import { Service } from "./Service"

@Entity()
export class DetailProduct extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    cant : number
    @Column()
    price : number
    @Column()
    state : number
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date

    @ManyToOne(()=> Entry,(entry)=>entry.details)
    entry :Entry
    @ManyToOne(()=> Product,(product)=>product.details)
    product :Product
}