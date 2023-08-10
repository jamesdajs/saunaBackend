import { BaseEntity, Column, CreateDateColumn, Entity, IsNull, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
@Entity()
export class Data extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({unique:true})
    username : string
    @Column({length: 200,default:""})
    password : string
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToOne(() => User, (user) => user.data)
    @JoinColumn()
    user: User
}