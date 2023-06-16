import {Column, Entity, PrimaryColumn} from "typeorm";
@Entity("users", { schema: "auth" })

export class UsersEntity {

    @PrimaryColumn({
        type: 'integer',
        name: 'id',
        precision: 32
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
    eMail: string;

    @Column({
        type: 'character varying',
        name: 'password',
        length: '255'
    })
    password: string;

}