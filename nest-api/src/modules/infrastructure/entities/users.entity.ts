import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
@Entity("users", { schema: "auth" })

export class Users {

    @PrimaryGeneratedColumn({
        type: 'integer',
        name: 'id'
    })
    id: number;

    @Column({
        type: 'character varying',
        name: 'name',
        length: '255',
    })
    name: string;

    @Column({
        type: 'character varying',
        name: 'email',
        length: '255',
    })
    email: string;

    @Column({
        type: 'character varying',
        name: 'password',
        length: '255'
    })
    password: string;

}