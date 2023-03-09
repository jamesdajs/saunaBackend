import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DetailService } from "./DetailService"
import { Entry } from "./Entry"

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    name : string
    @Column()
    type : number
    @Column()
    price : number
    @Column()
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