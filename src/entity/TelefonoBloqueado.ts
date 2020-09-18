import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Empresa} from "./Empresa";


@Entity()
export class TelefonoBloqueado extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    telefono: string
    @ManyToOne(type => Empresa, empresa => empresa.telefonoBloqueados)
    empresa: Empresa
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date
}
