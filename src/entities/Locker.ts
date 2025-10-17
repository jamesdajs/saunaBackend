import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { DetailService } from "./DetailService"

@Entity()
export class Locker extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({length: 15,default:""})
    code : string
    @Column({length: 50,default:""})
    type : string
    @Column({length: 400,default:""})
    observation : string
    @Column('boolean', {default: false})
    taken: boolean
    @Column('boolean', {default: true})
    state : boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date

    @ManyToMany(() => DetailService, (detail) => detail.lockers)
    details: DetailService[]
}