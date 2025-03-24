import { MigrationInterface, QueryRunner } from "typeorm";

export class UserWith2FA1741910725370 implements MigrationInterface {
    name = 'UserWith2FA1741910725370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "otp" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "otpExpiresAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "user" ADD "secretKey" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_5b6cf3f4a0599b6429b474799e3" UNIQUE ("secretKey")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twoFactorEnabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "twoFactorMethod" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twoFactorMethod"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twoFactorEnabled"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_5b6cf3f4a0599b6429b474799e3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "secretKey"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otpExpiresAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "otp"`);
    }

}
