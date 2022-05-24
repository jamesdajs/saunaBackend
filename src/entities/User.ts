import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Data } from "./Data"
import { Role } from "./Role"
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    name : string
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToOne(() => Data, (data) => data.user)
    data: Data
    @ManyToOne(()=> Role,(role)=>role.users)
    role :Role
}