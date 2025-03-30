import { MigrationInterface, QueryRunner } from "typeorm";

export class ExerciseWithWorkoutExercise1743271804245 implements MigrationInterface {
    name = 'ExerciseWithWorkoutExercise1743271804245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout" ADD "exerciseId" uuid`);
        await queryRunner.query(`ALTER TABLE "workout" ADD CONSTRAINT "FK_dbe5adf43a584c46da0350f11fd" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout" DROP CONSTRAINT "FK_dbe5adf43a584c46da0350f11fd"`);
        await queryRunner.query(`ALTER TABLE "workout" DROP COLUMN "exerciseId"`);
    }

}
