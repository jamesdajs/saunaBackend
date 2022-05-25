import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm"
import { Customer } from "./Customer"
import { DetailService } from "./DetailService"
import { User } from "./User"

@Entity()
export class Entry extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    dateOut : Date
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
}