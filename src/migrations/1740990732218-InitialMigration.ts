import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1740990732218 implements MigrationInterface {
    name = 'InitialMigration1740990732218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "eventType" "public"."user_event_eventtype_enum" NOT NULL, "description" character varying, "userId" uuid, CONSTRAINT "PK_4245a6b002b13f12e426d9db3ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_77452fe8443c349b0e628507cbb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_77452fe8443c349b0e628507cbb"`);
        await queryRunner.query(`DROP TABLE "user_event"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
