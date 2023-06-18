import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
@Entity("documents", { schema: "public" })
export class Documents {
  @PrimaryGeneratedColumn({
    type: "integer",
    name: "id"
  })
  id: number;

  @Column({
    type: "character varying",
    name: "title",
    length: "255",
  })
  title: string;

  @Column({
    type: "text",
    name: "content",
  })
  contents: string;
}
