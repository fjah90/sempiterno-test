import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocuments1632422926045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."documents" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "contents" text NOT NULL, CONSTRAINT "PK_96b9f6acbb3e4eee5a3f8baf52d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "public"."documents"`);
    }

}