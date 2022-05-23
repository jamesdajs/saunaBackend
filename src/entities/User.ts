import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
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
}