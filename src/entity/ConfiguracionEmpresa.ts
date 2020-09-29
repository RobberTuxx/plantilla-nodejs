import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Empresa} from "./Empresa";

@Entity()
export class ConfiguracionEmpresa extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    whatsapp: string
    @Column()
    mensajesComprados: number
    @OneToOne(type => Empresa, empresa => empresa.configuracionEmpresa)
    empresa: Empresa
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
    @DeleteDateColumn()
    deletedAt: Date

}
