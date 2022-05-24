import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    name : string
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date

}