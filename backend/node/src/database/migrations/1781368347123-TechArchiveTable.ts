import { MigrationInterface, QueryRunner } from "typeorm";

export class TechArchiveTable1781368347123 implements MigrationInterface {
    name = 'TechArchiveTable1781368347123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trends" ("id" SERIAL NOT NULL, "platform_id" integer, "article_id" integer, "like_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4de18eea43d948e5ea66520e0e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" integer NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feeds" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "thumbnail_url" text, "platform_id" integer NOT NULL, "category_id" integer NOT NULL, "site_url" character varying NOT NULL, "rss_url" character varying NOT NULL, "api_query_param" text, "trend_platform_type" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3dafbf766ecbb1eb2017732153f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "platforms" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "site_url" character varying NOT NULL, "platform_site_type" integer NOT NULL, "favicon_url" character varying NOT NULL, "is_eng" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_3b879853678f7368d46e52b81c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "platform_id" integer NOT NULL, "feed_id" integer NOT NULL, "title" character varying NOT NULL, "article_url" character varying NOT NULL, "tags" text, "thumbnail_url" text, "is_private" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "email_verified_at" TIMESTAMP, "last_login_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" SERIAL NOT NULL, "user_id" integer, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_9e432b7df0d182f8d292902d1a" UNIQUE ("user_id"), CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bookmarks" ("id" SERIAL NOT NULL, "profile_id" integer NOT NULL, "platform_id" integer, "article_id" integer NOT NULL, "title" character varying NOT NULL, "article_url" character varying NOT NULL, "thumbnail_url" character varying NOT NULL, "platform_name" character varying NOT NULL, "platform_url" character varying NOT NULL, "platform_favicon_url" character varying NOT NULL, "is_read" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "category_id" integer, "article_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feed_article_relations" ("id" SERIAL NOT NULL, "feed_id" integer NOT NULL, "article_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_03867ffe4dc9ace43be57df06a9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_20d31fb2cdbf7a192df8c2f675" ON "feed_article_relations"  ("feed_id", "article_id") `);
        await queryRunner.query(`ALTER TABLE "trends" ADD CONSTRAINT "FK_be0e433b659d025e479918d42ab" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trends" ADD CONSTRAINT "FK_6f7b8e40d2eb5866cf732665f10" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feeds" ADD CONSTRAINT "FK_dbff04aa72971a0fb0551345c40" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feeds" ADD CONSTRAINT "FK_63786c1f5f16b56b986811ac637" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_2dd06ddbc33895c69a4d7acd3b7" FOREIGN KEY ("platform_id") REFERENCES "platforms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_55095c56b6f0125467d0818953d" FOREIGN KEY ("feed_id") REFERENCES "feeds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_42e305026468ab0da6e706f27bd" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feed_article_relations" ADD CONSTRAINT "FK_4e0db862fc3f7890990eedecb46" FOREIGN KEY ("feed_id") REFERENCES "feeds"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feed_article_relations" ADD CONSTRAINT "FK_903c131e5a620df975d45af65dd" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feed_article_relations" DROP CONSTRAINT "FK_903c131e5a620df975d45af65dd"`);
        await queryRunner.query(`ALTER TABLE "feed_article_relations" DROP CONSTRAINT "FK_4e0db862fc3f7890990eedecb46"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_42e305026468ab0da6e706f27bd"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_9e432b7df0d182f8d292902d1a2"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_55095c56b6f0125467d0818953d"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_2dd06ddbc33895c69a4d7acd3b7"`);
        await queryRunner.query(`ALTER TABLE "feeds" DROP CONSTRAINT "FK_63786c1f5f16b56b986811ac637"`);
        await queryRunner.query(`ALTER TABLE "feeds" DROP CONSTRAINT "FK_dbff04aa72971a0fb0551345c40"`);
        await queryRunner.query(`ALTER TABLE "trends" DROP CONSTRAINT "FK_6f7b8e40d2eb5866cf732665f10"`);
        await queryRunner.query(`ALTER TABLE "trends" DROP CONSTRAINT "FK_be0e433b659d025e479918d42ab"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_20d31fb2cdbf7a192df8c2f675"`);
        await queryRunner.query(`DROP TABLE "feed_article_relations"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "bookmarks"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "platforms"`);
        await queryRunner.query(`DROP TABLE "feeds"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "trends"`);
    }

}
