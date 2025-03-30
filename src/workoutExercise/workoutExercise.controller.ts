import { Request, Response } from "express";
import { WorkoutExerciseService } from "./workoutExercise.service";
import { CreateWorkoutExerciseDto } from "./dto/create-workoutExercise.dto";

const workoutExerciseService = new WorkoutExerciseService();

export const addExerciseToWorkout = async (req: Request, res: Response): Promise<void> => {
    const createWorkoutExerciseDto: CreateWorkoutExerciseDto = req.body;
    try {
        const workoutExercise = await workoutExerciseService.addExerciseToWorkout(createWorkoutExerciseDto);
        res.status(201).json(workoutExercise);
    } catch (error) {
        console.error("Error adding exercise to workout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getExercisesForWorkout = async (req: Request, res: Response): Promise<void> => {
    const { workoutId } = req.params;
    try {
        const exercises = await workoutExerciseService.getExercisesForWorkout(workoutId);
        res.status(200).json(exercises);
    } catch (error) {
        console.error("Error fetching exercises for workout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateExercisesForWorkout = async (req: Request, res: Response): Promise<void> => {
    const { workoutId } = req.params;
    const updatedExerciseData = req.body;

    try {
        const updatedWorkoutExercise = await workoutExerciseService.updateExercisesForWorkout(workoutId, [
            { ...updatedExerciseData },
        ]);
        res.status(200).json(updatedWorkoutExercise);
    } catch (error) {
        console.error("Error updating exercises for workout:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteExerciseForWorkout = async (req: Request, res: Response): Promise<void> => {
    const { workoutId } = req.params;
    const { exerciseId } = req.body;

    try {
        const result = await workoutExerciseService.deleteExerciseForWorkout(workoutId, exerciseId);
        res.status(200).json({ message: "Exercise deleted successfully", result });
    } catch (error) {
        console.error("Error deleting exercise for workout:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};