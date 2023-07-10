import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"
import { Customer } from "./Customer"
import { DetailProduct } from "./DetailProduct"
import { DetailService } from "./DetailService"
import { Product } from "./Product"
import { User } from "./User"

@Entity()
export class Entry extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    dateOut : Date
    @CreateDateColumn({
        type: 'date',
    })
    dateIn : Date
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    total : number
    @Column('boolean', {default: true})
    state : boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @ManyToOne(()=> User,(user)=>user.entries)
    user :User
    @ManyToOne(()=> Customer,(customer)=>customer.entries)
    customer :Customer
    @OneToMany(() => DetailService, (detail) => detail.entry)
    details: [DetailService]
    @OneToMany(() => DetailProduct, (product) => product.entry)
    detailsProduct: [DetailProduct]
}