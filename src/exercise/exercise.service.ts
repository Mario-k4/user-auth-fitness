import { ExerciseCategory } from "../core/enums/exercise-category.enum";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";
import { Exercise } from "./entities/exercise.entity";


export class ExerciseService {

    async createExercise(createExerciseDto: CreateExerciseDto) {
        try {
            const { name, category, isPredefined } = createExerciseDto;
            const normalizedName = name.toLowerCase().replace(/\s+/g, "");
            const existingExercise = await Exercise.findOne({ where: { name: normalizedName } });
            if (existingExercise) {
                throw new Error(`Exercise with name "${name}" already exists.`);
            }
            const exercise = Exercise.create({ name: normalizedName, category, isPredefined });
            await Exercise.save(exercise);
            return exercise;
        } catch (error) {
            console.error("Error in createExercise:", error);
            throw error;
        }
    }

    async getExerciseByName(name: string): Promise<Exercise | null> {
        try {
            const normalizedName = name.toLowerCase().replace(/\s+/g, "");
            const exercise = await Exercise.findOne({ where: { name: normalizedName } });
            return exercise;
        } catch (error) {
            console.error(`Error fetching exercise by name "${name}":`, error);
            throw new Error(`Unable to fetch exercise with name "${name}". Please try again later.`);
        }
    }

    async getAllExercises() {
        try {
            return await Exercise.find();
        } catch (error) {
            console.error("Error fetching exercises:", error);
            throw new Error("Unable to fetch exercises. Please try again later.");
        }
    }

    async getExercisesByCategory(category: ExerciseCategory) {
        try {
            const exercises = await Exercise.find({ where: { category } });
            return exercises;
        } catch (error) {
            console.error(`Error fetching exercises by category "${category}":`, error);
            throw new Error(`Unable to fetch exercises for category "${category}". Please try again later.`);
        }
    }

    async getDistinctCategories(): Promise<ExerciseCategory[]> {
        try {
            const categories = await Exercise.createQueryBuilder("exercise")
                .select("DISTINCT exercise.category", "category")
                .getRawMany();
            if (!categories.length) {
                throw new Error("No categories found.");
            }
            return categories.map((c) => c.category);
        } catch (error) {
            console.error("Error fetching distinct categories:", error);
            throw new Error(error.message || "Unable to fetch distinct categories. Please try again later.");
        }
    }

    async updateExercise(id: string, updateExerciseDto: UpdateExerciseDto) {
        try {
            const exercise = await Exercise.findOne({ where: { id } });
            if (!exercise) {
                throw new Error(`Exercise with ID "${id}" not found.`);
            }
            const { name, category, isPredifined } = updateExerciseDto;
            if (name !== undefined) {
                const normalizedName = name.toLowerCase().replace(/\s+/g, "");
                exercise.name = normalizedName;
            }
            if (category !== undefined) exercise.category = category;
            if (isPredifined !== undefined) exercise.isPredefined = isPredifined;
            await Exercise.save(exercise);
            return exercise;
        } catch (error) {
            console.error(`Error updating exercise with ID "${id}":`, error);
            throw new Error(`Unable to update exercise with ID "${id}". Please try again later.`);
        }
    }

    async deleteExercise(id: string) {
        try {
            const exercise = await Exercise.findOne({ where: { id } });
            if (!exercise) {
                throw new Error(`Exercise with ID "${id}" not found.`);
            }
            await Exercise.remove(exercise);
            return { message: `Exercise with ID "${id}" has been deleted successfully.` };
        } catch (error) {
            console.error(`Error deleting exercise with ID "${id}":`, error);
            throw new Error(`Unable to delete exercise with ID "${id}". Please try again later.`);
        }
    }
}
