import { CreateWorkoutExerciseDto } from "./dto/create-workoutExercise.dto";
import { UpdateWorkoutExerciseDto } from "./dto/update-workoutExercise.dto";
import { WorkoutExercise } from "./entities/workoutExercise.entity";


export class WorkoutExerciseService {

    async addExerciseToWorkout(createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
        const { workoutId, exerciseId, sets, reps, weight, duration } = createWorkoutExerciseDto;
        const workoutExercise = WorkoutExercise.create({
            workout: { id: workoutId },
            exercise: { id: exerciseId },
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

            const workoutExercise = await WorkoutExercise.findOne({
                where: { workout: { id: workoutId }, exercise: { id: exerciseId } },
            });

            if (!workoutExercise) {
                throw new Error(`WorkoutExercise not found for workoutId=${workoutId}, exerciseId=${exerciseId}`);
            }

            workoutExercise.sets = sets;
            workoutExercise.reps = reps;
            workoutExercise.weight = weight;
            workoutExercise.duration = duration;

            await WorkoutExercise.save(workoutExercise);
            updatedWorkoutExercises.push(workoutExercise);
        }

        return updatedWorkoutExercises;
    }
}
