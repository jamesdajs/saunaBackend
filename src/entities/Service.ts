import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DetailService } from "./DetailService"
import { Entry } from "./Entry"

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({length: 50,default:""})
    name : string
    @Column()
    type : number
    @Column()
    price : number
    @Column({length: 400,default:""})
    description : string
    @Column('boolean', {default: true})
    state : boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToMany(() => DetailService, (detail) => detail.service)
    details: [DetailService]
}