import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({default:"", length: 50 })
    name : string
    @Column({default:true})
    state:boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToMany(() => Product, (product) => product.category)
    products: [Product]

}