import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DetailService } from "./DetailService"

@Entity()
export class Locker extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    code : string
    @Column()
    type : string
    @Column()
    observation : string
    @Column('boolean', {default: true})
    state : boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date

    @ManyToMany(() => DetailService, (detail) => detail.lockers)
    details: DetailService[]
}