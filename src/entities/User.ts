import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Data } from "./Data"
import { Entry } from "./Entry"
import { Role } from "./Role"
@Entity()
export class User extends BaseEntity {
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
    @Column({type: 'date'})
    birthdate : Date
    @Column({default:""})
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