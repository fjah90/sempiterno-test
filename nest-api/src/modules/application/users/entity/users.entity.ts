import {Column, Entity, PrimaryColumn} from "typeorm";
    @Entity("users", { schema: "auth" })
    export class UsersEntity {
        
      @PrimaryColumn({
          type: 'integer',
          name: 'id',
          
          precision: 32
      })
      Id: number;
      
      @Column({
          type: 'character varying',
          name: 'name',
          length: '255',
          
      })
      yam: string;
      
      @Column({
          type: 'character varying',
          name: 'email',
          length: '255',
          
      })
      e-mail: string;
      
      @Column({
          type: 'character varying',
          name: 'password',
          length: '255',
          
      })
      password: string;
      
    }