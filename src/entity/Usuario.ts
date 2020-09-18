import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToMany, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UsuarioInterface} from "../Interfaces/Usuario.Interface";
import {Rol} from "./Rol";
import {Empresa} from "./Empresa";

@Entity()
export class Usuario extends BaseEntity implements UsuarioInterface {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    password: string
    @Column()
    pushToken: string
    @Column()
    telefono: string
    @Column()
    nombre: string
    @Column()
    apellidoPaterno: string
    @Column()
    apellidoMaterno: string
    @ManyToMany(type => Rol)
    @JoinColumn()
    rol: Rol[]
    @ManyToOne(type => Empresa, empresa=> empresa.usuarios)
    empresa: Empresa
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date

    constructor(usuario?) {
        super();
        if (usuario) {
            this.id = usuario.id
            this.pushToken = usuario.pushToken
            this.telefono = usuario.telefono
            this.nombre = usuario.nombre
            this.email = usuario.email
        }
    }
}
