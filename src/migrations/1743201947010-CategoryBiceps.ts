import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryBiceps1743201947010 implements MigrationInterface {
    name = 'CategoryBiceps1743201947010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."exercise_category_enum" RENAME TO "exercise_category_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."exercise_category_enum" AS ENUM('Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs', 'Core')`);
        await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "category" TYPE "public"."exercise_category_enum" USING "category"::"text"::"public"."exercise_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_category_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."exercise_category_enum_old" AS ENUM('Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Core')`);
        await queryRunner.query(`ALTER TABLE "exercise" ALTER COLUMN "category" TYPE "public"."exercise_category_enum_old" USING "category"::"text"::"public"."exercise_category_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."exercise_category_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."exercise_category_enum_old" RENAME TO "exercise_category_enum"`);
    }

}
