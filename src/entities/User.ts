import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Data } from "./Data"
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
}