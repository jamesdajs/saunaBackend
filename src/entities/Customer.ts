import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Entry } from "./Entry"

@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({ default:"",length: 50 })
    name : string
    @Column({ default:"",length: 15 })
    ci : string
    @Column({ default:"",length: 15 })
    phone : string
    @Column()
    gender : number
    @Column({ default:"",length: 400 })
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