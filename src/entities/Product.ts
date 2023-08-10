import { BaseEntity, Column, CreateDateColumn, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Category } from "./Category"
import { DetailProduct } from "./DetailProduct"

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({length: 50,default:""})
    name : string
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    price : number
    @Column({length:400,default:""})
    description : string
    @Column({length: 400,default:""})
    urlImage : string
    @Column('boolean', {default: true})
    state : boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    
    @ManyToOne(()=> Category,(category)=>category.products)
    category :Category
    @OneToMany(() => DetailProduct, (detail) => detail.product)
    details: DetailProduct[]
}