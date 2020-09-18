import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinTable, ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Usuario} from "./Usuario";

@Entity()
export class Rol extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @ManyToMany(type => Usuario)
    @JoinTable()
    usuario: Usuario[]
    @CreateDateColumn()
    createdAt: Date
    @DeleteDateColumn()
    deletedAt: Date
    @UpdateDateColumn()
    updatedAt: Date

}
