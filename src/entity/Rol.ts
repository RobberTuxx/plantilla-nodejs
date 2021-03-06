import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
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
    usuario: Usuario[]
    @CreateDateColumn()
    createdAt: Date
    @DeleteDateColumn()
    deletedAt: Date
    @UpdateDateColumn()
    updatedAt: Date

    constructor(rol?) {
        super();
        if (rol) {
            this.id = rol.id
        }
    }
}
