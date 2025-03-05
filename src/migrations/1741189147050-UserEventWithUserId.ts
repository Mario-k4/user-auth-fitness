import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEventWithUserId1741189147050 implements MigrationInterface {
    name = 'UserEventWithUserId1741189147050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_77452fe8443c349b0e628507cbb"`);
        await queryRunner.query(`ALTER TABLE "user_event" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_77452fe8443c349b0e628507cbb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_77452fe8443c349b0e628507cbb"`);
        await queryRunner.query(`ALTER TABLE "user_event" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_77452fe8443c349b0e628507cbb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD "description" character varying`);
    }

}
