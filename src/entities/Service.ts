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
    type : string
    @Column()
    price : number
    
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToMany(() => DetailService, (detail) => detail.service)
    details: [DetailService]
}