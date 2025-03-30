import { Request, Response } from "express";
import { WorkoutService } from "./workout.service";
import { CreateWorkoutDto } from "./dto/create-workout.dto";

const workoutService = new WorkoutService();

export const createWorkout = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const createWorkoutDto: CreateWorkoutDto = req.body;
    try {
        const workout = await workoutService.createWorkout(userId, createWorkoutDto);
        res.status(201).json(workout);
    } catch (error) {
        console.error("Error creating workout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getWorkouts = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        const workouts = await workoutService.getWorkouts(userId);
        res.status(200).json(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getWorkoutById = async (req: Request, res: Response): Promise<void> => {
    const { workoutId } = req.params;
    const { userId } = req.body;
    try {
        const workout = await workoutService.getWorkoutById(workoutId, userId);
        res.status(200).json(workout);
    } catch (error) {
        console.error(`Error fetching workout with ID "${workoutId}":`, error);
        res.status(404).json({ message: error.message });
    }
};

export const updateWorkout = async (req: Request, res: Response): Promise<void> => {
    const { workoutId } = req.params;
    const { userId } = req.body;
    const updateWorkoutDto: Partial<CreateWorkoutDto> = req.body;
    try {
        const updatedWorkout = await workoutService.updateWorkout(workoutId, userId, updateWorkoutDto);
        res.status(200).json(updatedWorkout);
    } catch (error) {
        console.error(`Error updating workout with ID "${workoutId}":`, error);
        res.status(404).json({ message: error.message });
    }
};

export const deleteWorkout = async (req: Request, res: Response): Promise<void> => {
    const { workoutId } = req.params;
    const { userId } = req.body;
    try {
        const result = await workoutService.deleteWorkout(workoutId, userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(`Error deleting workout with ID "${workoutId}":`, error);
        res.status(404).json({ message: error.message });
    }
};
