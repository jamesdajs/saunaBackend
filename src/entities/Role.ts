import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"
@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    name : string
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToMany(() => User, (user) => user.role)
    users: [User]
}