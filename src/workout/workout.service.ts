import { User } from "../user/entities/user.entity";
import { CreateWorkoutDto } from "./dto/create-workout.dto";
import { Workout } from "./entities/workout.entity";

export class WorkoutService {
    async createWorkout(userId: string, createWorkoutDto: CreateWorkoutDto) {
        try {
            const { title } = createWorkoutDto;

            const user = await User.findOne({ where: { id: userId } });

            if (!user) {
                throw new Error("User not found");
            }

            const workout = Workout.create({ title, user });

            await Workout.save(workout);

            const savedWorkout = await Workout.findOne({
                where: { id: workout.id },
                relations: ["workoutExercises"],
            });

            return savedWorkout;
        } catch (error) {
            console.error("Error creating workout:", error);
            throw new Error("Failed to create workout");
        }
    }

    async getWorkouts(userId: string) {
        try {
            return await Workout.find({
                where: { user: { id: userId } },
                relations: ["workoutExercises"],
            });
        } catch (error) {
            console.error("Error fetching workouts:", error);
            throw new Error("Failed to fetch workouts");
        }
    }

    async getWorkoutById(workoutId: string, userId: string) {
        try {
            const workout = await Workout.findOne({
                where: { id: workoutId, user: { id: userId } },
                relations: ["workoutExercises"],
            });

            if (!workout) {
                throw new Error(`Workout with ID "${workoutId}" not found.`);
            }
            return workout;
        } catch (error) {
            console.error(`Error fetching workout with ID "${workoutId}":`, error);
            throw new Error(`Failed to fetch workout with ID "${workoutId}"`);
        }
    }

    async updateWorkout(workoutId: string, userId: string, updateWorkoutDto: Partial<CreateWorkoutDto>) {
        try {
            const workout = await Workout.findOne({
                where: { id: workoutId, user: { id: userId } },
            });

            if (!workout) {
                throw new Error(`Workout with ID "${workoutId}" not found.`);
            }

            Object.assign(workout, updateWorkoutDto);
            await Workout.save(workout);

            return workout;
        } catch (error) {
            console.error(`Error updating workout with ID "${workoutId}":`, error);
            throw new Error(`Failed to update workout with ID "${workoutId}"`);
        }
    }

    async deleteWorkout(workoutId: string, userId: string) {
        try {
            const workout = await Workout.findOne({
                where: { id: workoutId, user: { id: userId } },
            });

            if (!workout) {
                throw new Error(`Workout with ID "${workoutId}" not found.`);
            }

            await Workout.remove(workout);
            return { message: `Workout with ID "${workoutId}" has been deleted.` };
        } catch (error) {
            console.error(`Error deleting workout with ID "${workoutId}":`, error);
            throw new Error(`Failed to delete workout with ID "${workoutId}"`);
        }
    }
}
