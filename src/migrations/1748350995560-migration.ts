import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1748350995560 implements MigrationInterface {
  public name = 'Migration1748350995560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "set" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "count" integer NOT NULL, "releaseDate" TIMESTAMP NOT NULL, "label" json NOT NULL, "packs" text array NOT NULL, CONSTRAINT "PK_3a80144a9f862484a2cae876eed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "label" json NOT NULL, "number" integer NOT NULL, "imageName" character varying NOT NULL, "packs" text array NOT NULL, "set_id" uuid, "rarity_id" integer, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rarity" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_abfb3052bad892c356e54679f8f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_d0a1f698623cc95750422e1aeae" FOREIGN KEY ("set_id") REFERENCES "set"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_03ec518a7d79f1691b320d7c277" FOREIGN KEY ("rarity_id") REFERENCES "rarity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_03ec518a7d79f1691b320d7c277"`,
    );
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_d0a1f698623cc95750422e1aeae"`,
    );
    await queryRunner.query(`DROP TABLE "rarity"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "set"`);
  }
}
