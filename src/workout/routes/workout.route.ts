import { Router } from "express";
import { createWorkout, deleteWorkout, getWorkoutById, getWorkouts, updateWorkout } from "../workout.controller";

const workoutRouter = Router()

workoutRouter.post("/create-workout", createWorkout)
workoutRouter.get("/:userId", getWorkouts);
workoutRouter.get("/:userId/:workoutId", getWorkoutById);
workoutRouter.put("/:userId/:workoutId", updateWorkout);
workoutRouter.delete("/:userId/:workoutId", deleteWorkout);

export default workoutRouter;