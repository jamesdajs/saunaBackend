import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Category } from "./Category"
import { DetailProduct } from "./DetailProduct"

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    name : string
    @Column()
    price : number

    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    
    @ManyToOne(()=> Category,(category)=>category.products)
    category :Category
    @OneToMany(() => DetailProduct, (detail) => detail.product)
    details: DetailProduct[]
}