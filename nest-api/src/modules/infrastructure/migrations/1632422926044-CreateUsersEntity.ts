import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1632422926044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS auth`);
        await queryRunner.query(`CREATE TABLE "auth"."users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_055b3c3f98b5b766d3a817cc72a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "auth"."users"`);
    }

}