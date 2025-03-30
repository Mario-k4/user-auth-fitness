import { Exercise } from "../exercise/entities/exercise.entity";
import { Workout } from "../workout/entities/workout.entity";
import { CreateWorkoutExerciseDto } from "./dto/create-workoutExercise.dto";
import { UpdateWorkoutExerciseDto } from "./dto/update-workoutExercise.dto";
import { WorkoutExercise } from "./entities/workoutExercise.entity";


export class WorkoutExerciseService {

    async addExerciseToWorkout(createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
        const { workoutId, exerciseId, sets, reps, weight, duration } = createWorkoutExerciseDto;

        console.log("Received workoutId:", workoutId);
        console.log("Received exerciseId:", exerciseId);

        // Fetch the workout
        const workout = await Workout.findOne({ where: { id: workoutId } });
        console.log("Found workout:", workout);

        // Fetch the exercise
        const exercise = await Exercise.findOne({ where: { id: exerciseId } });
        console.log("Found exercise:", exercise);

        if (!workout || !exercise) {
            throw new Error("Workout or Exercise not found");
        }

        const workoutExercise = WorkoutExercise.create({
            workout,
            exercise,
            sets,
            reps,
            weight,
            duration,
        });

        await WorkoutExercise.save(workoutExercise);
        return workoutExercise;
    }

    async getExercisesForWorkout(workoutId: string) {
        return WorkoutExercise.find({ where: { workout: { id: workoutId } }, relations: ["exercise"] });
    }

    async updateExercisesForWorkout(workoutId: string, updatedExercises: UpdateWorkoutExerciseDto[]) {
        const updatedWorkoutExercises = [];

        for (const updatedExercise of updatedExercises) {
            const { exerciseId, sets, reps, weight, duration } = updatedExercise;

            let workoutExercise = await WorkoutExercise.findOne({
                where: { workout: { id: workoutId }, exercise: { id: exerciseId } },
            });

            // ✅ Create workout exercise if it doesn’t exist
            if (!workoutExercise) {
                console.log(`WorkoutExercise not found. Creating new one.`);
                const workout = await Workout.findOne({ where: { id: workoutId } });
                const exercise = await Exercise.findOne({ where: { id: exerciseId } });

                if (!workout || !exercise) {
                    throw new Error("Workout or Exercise not found");
                }

                workoutExercise = WorkoutExercise.create({
                    workout,
                    exercise,
                    sets,
                    reps,
                    weight,
                    duration,
                });
            } else {
                // ✅ Update existing entry
                workoutExercise.sets = sets;
                workoutExercise.reps = reps;
                workoutExercise.weight = weight;
                workoutExercise.duration = duration;
            }

            await WorkoutExercise.save(workoutExercise);
            updatedWorkoutExercises.push(workoutExercise);
        }

        return updatedWorkoutExercises;
    }

    async deleteExerciseForWorkout(workoutId: string, exerciseId: string) {
        const workoutExercise = await WorkoutExercise.findOne({
            where: { workout: { id: workoutId }, exercise: { id: exerciseId } },
        });

        if (!workoutExercise) {
            console.warn(`WorkoutExercise not found for workoutId: ${workoutId}, exerciseId: ${exerciseId}`);
            return { message: `WorkoutExercise not found` };
        }

        await WorkoutExercise.remove(workoutExercise);
        return { message: `Exercise removed from workout` };
    }
}
