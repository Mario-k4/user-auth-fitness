import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEvents1740758957547 implements MigrationInterface {
    name = 'UserEvents1740758957547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_event_eventtype_enum" AS ENUM('LOGIN', 'LOGOUT', 'FAILED_LOGIN', 'TWO_FACTOR_ENABLED', 'TWO_FACTOR_DISABLED', 'PASSWORD_RESET', 'PASSWORD_CHANGED', 'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED', 'EMAIL_CHANGED', 'PHONE_CHANGED', 'PROFILE_PICTURE_UPDATED', 'USERNAME_CHANGED', 'NOTIFICATION_PREFERENCES_UPDATED', 'ACCOUNT_UPDATE', 'ACCOUNT_DEACTIVATED', 'ACCOUNT_REACTIVATED', 'ACCOUNT_DELETED', 'NEW_DEVICE_LOGIN', 'SESSION_EXPIRED', 'SESSION_TERMINATED')`);
        await queryRunner.query(`CREATE TABLE "user_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "eventType" "public"."user_event_eventtype_enum" NOT NULL, "eventTimestamp" TIMESTAMP NOT NULL, "description" character varying, "userId" uuid, CONSTRAINT "PK_4245a6b002b13f12e426d9db3ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_77452fe8443c349b0e628507cbb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_77452fe8443c349b0e628507cbb"`);
        await queryRunner.query(`DROP TABLE "user_event"`);
        await queryRunner.query(`DROP TYPE "public"."user_event_eventtype_enum"`);
    }

}
