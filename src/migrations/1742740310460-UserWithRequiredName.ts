import { MigrationInterface, QueryRunner } from "typeorm";

export class UserWithRequiredName1742740310460 implements MigrationInterface {
    name = 'UserWithRequiredName1742740310460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`);
    }

}
