import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Conversacion} from "./Conversacion";
import {Usuario} from "./Usuario";

@Entity()
export class Chat extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    remitente: string
    @Column()
    destinatario: string
    @OneToMany(type => Conversacion, conversacion => conversacion.chat, {cascade: true})
    conversacion: Conversacion[]
    @ManyToOne(type => Usuario, usuario => usuario.chat)
    usuario: Usuario
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
    @DeleteDateColumn()
    deletedAt: Date

    constructor(chat?) {
        super();
        if (chat){
            this.remitente = chat.remitente
            this.destinatario = chat.destinatario
            this.conversacion = chat.conversacion
            this.usuario = chat.usuario
        }
    }
}
