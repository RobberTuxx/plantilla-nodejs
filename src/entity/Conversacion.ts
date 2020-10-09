import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Chat} from "./Chat";
import {ConversacionInterface} from "../Interfaces/Conversacion";

@Entity()
export class Conversacion extends BaseEntity implements ConversacionInterface{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    mensaje: string
    @Column()
    remitente: boolean
    @ManyToOne(type => Chat, chat => chat.conversacion)
    chat: Chat
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
    @DeleteDateColumn()
    deletedAt: Date

    constructor(conversacion?) {
        super();
        if (conversacion){
            this.mensaje = conversacion.mensaje
            this.remitente = conversacion.remitente
            this.chat = conversacion.chat
        }
    }
}
