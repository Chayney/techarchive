import { MigrationInterface, QueryRunner } from "typeorm";

export class TechArchiveTable1780753644464 implements MigrationInterface {
    name = 'TechArchiveTable1780753644464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "type" TO "profile_id"`);
        await queryRunner.query(`CREATE TABLE "favorite_articles" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "category_id" integer, "article_id" integer, CONSTRAINT "UQ_849e75fb6111e5c9e6fdf2990ab" UNIQUE ("category_id", "article_id"), CONSTRAINT "PK_65f875472687201ad79119ac5de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "profile_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_85841a886266e3de64aed7d0682" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_articles" ADD CONSTRAINT "FK_bd37238536ab105cd7d612ea424" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_articles" ADD CONSTRAINT "FK_1096fb3c7d7134eda5b9a7ae68c" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_articles" DROP CONSTRAINT "FK_1096fb3c7d7134eda5b9a7ae68c"`);
        await queryRunner.query(`ALTER TABLE "favorite_articles" DROP CONSTRAINT "FK_bd37238536ab105cd7d612ea424"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_85841a886266e3de64aed7d0682"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "profile_id" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "favorite_articles"`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "profile_id" TO "type"`);
    }

}
