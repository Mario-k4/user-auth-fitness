import { MigrationInterface, QueryRunner } from "typeorm";

export class ExercisesWithCategories1742978105833 implements MigrationInterface {
    name = 'ExercisesWithCategories1742978105833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."exercise_category_enum" AS ENUM('Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core')`);
        await queryRunner.query(`ALTER TABLE "exercise" ADD "category" "public"."exercise_category_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_category_enum"`);
    }

}
