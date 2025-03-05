import { MigrationInterface, QueryRunner } from "typeorm";

export class UserOptionalName1741009450166 implements MigrationInterface {
    name = 'UserOptionalName1741009450166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`);
    }

}
