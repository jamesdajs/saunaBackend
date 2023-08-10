import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Data } from "./Data"
import { Entry } from "./Entry"
import { Role } from "./Role"
@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number
    @Column({ length: 50 })
    name : string
    @Column({ length: 15 })
    ci : string
    @Column({ length: 15 })
    phone : string
    @Column()
    gender : number
    @Column({type: 'date'})
    birthdate : Date
    @Column({default:"",length:400})
    observation : string
    @Column('boolean', {default: true})
    state : boolean
    @CreateDateColumn()
    createAt : Date
    @UpdateDateColumn()
    updateAt : Date
    @OneToOne(() => Data, (data) => data.user)
    data: Data
    @ManyToOne(()=> Role,(role)=>role.users)
    role :Role
    @OneToMany(() => Entry, (entry) => entry.user)
    entries: [Entry]
}