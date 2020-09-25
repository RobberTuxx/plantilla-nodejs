import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {TelefonoBloqueado} from "./TelefonoBloqueado";
import {Usuario} from "./Usuario";
import {ConfiguracionEmpresa} from "./ConfiguracionEmpresa";

@Entity()
export class Empresa extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: string
    @OneToMany(type => TelefonoBloqueado, telefonoBloqueado => telefonoBloqueado.empresa)
    telefonoBloqueados: TelefonoBloqueado[]
    @OneToMany(type => Usuario, usuario => usuario.empresa, {cascade: true})
    usuarios: Usuario[]
    @OneToOne(type => ConfiguracionEmpresa,{cascade: true})
    @JoinColumn()
    configuracionEmpresa: ConfiguracionEmpresa
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date

    constructor(empresa?) {
        super();
        if (empresa){
            this.nombre = empresa.nombre
            this.configuracionEmpresa = empresa.configuracionEmpresa
            this.usuarios = empresa.usuarios
        }
    }
}
