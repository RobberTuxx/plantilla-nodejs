import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {UsuarioInterface} from "../Interfaces/Usuario.Interface";
import {Rol} from "./Rol";
import {Empresa} from "./Empresa";
import {Chat} from "./Chat";

@Entity()
@Unique('correo', ['email'])
export class Usuario extends BaseEntity implements UsuarioInterface {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    password: string
    @Column({nullable: true})
    pushToken: string
    @Column()
    telefono: string
    @Column()
    nombre: string
    @Column()
    apellidoPaterno: string
    @Column()
    apellidoMaterno: string
    @Column({nullable: true})
    socketId: string
    @ManyToMany(type => Rol)
    @JoinTable()
    rol: Rol[]
    @ManyToOne(type => Empresa, empresa => empresa.usuarios)
    empresa: Empresa
    @OneToMany(type => Chat, chat => chat.usuario)
    chat: Chat[]
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @DeleteDateColumn()
    deletedAt: Date

    constructor(usuario?) {
        super();
        if (usuario) {
            this.email = usuario.email
            this.password = usuario.password
            this.telefono = usuario.telefono
            this.nombre = usuario.nombre
            this.apellidoPaterno = usuario.apellidoPaterno
            this.apellidoMaterno = usuario.apellidoMaterno
            this.empresa = usuario.empresa

        }
    }
}
