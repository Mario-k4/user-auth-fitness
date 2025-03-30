import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutsAndExercisesInitial1742944470107 implements MigrationInterface {
    name = 'WorkoutsAndExercisesInitial1742944470107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "isPredefined" boolean NOT NULL DEFAULT false, "createdById" uuid, CONSTRAINT "PK_a0f107e3a2ef2742c1e91d97c14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_ea37ec052825688082b19f0d939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_exercise" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sets" integer NOT NULL, "reps" integer NOT NULL, "weight" integer, "duration" integer, "workoutId" uuid NOT NULL, "exerciseId" uuid NOT NULL, CONSTRAINT "PK_9598996a913c5f5114f9e6403b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD CONSTRAINT "FK_6a3fcb35ca9190cea7a0cebc177" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_5c6e4714ac75eab49d2009f956c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_35fe273716366d768fba9964813" FOREIGN KEY ("workoutId") REFERENCES "workout"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" ADD CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_a2ac7d92eeb9bd5fc2bb9896611"`);
        await queryRunner.query(`ALTER TABLE "workout_exercise" DROP CONSTRAINT "FK_35fe273716366d768fba9964813"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_5c6e4714ac75eab49d2009f956c"`);
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "FK_6a3fcb35ca9190cea7a0cebc177"`);
        await queryRunner.query(`DROP TABLE "workout_exercise"`);
        await queryRunner.query(`DROP TABLE "workout"`);
        await queryRunner.query(`DROP TABLE "exercise"`);
    }

}
