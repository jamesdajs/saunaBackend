import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Entry } from "./Entry"

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    name : string
    @Column()
    ci : string
    @Column()
    phone : string
    @Column()
    gender : number
    @Column()
    observation : string
    @Column('boolean', {default: true})
    state : boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToMany(() => Entry, (entry) => entry.customer)
    entries: [Entry]

}