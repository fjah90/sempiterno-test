import { Column, Entity, PrimaryColumn } from "typeorm";
@Entity("documents", { schema: "public" })
export class DocumentsEntity {
  @PrimaryColumn({
    type: "integer",
    name: "id",
    precision: 32,
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
