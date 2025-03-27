import { Router } from "express";
import { addExerciseToWorkout, getExercisesForWorkout, updateExercisesForWorkout } from "../workoutExercise.controller";

const workoutExerciseRouter = Router();

workoutExerciseRouter.post("/add-exercise-to-workout", addExerciseToWorkout)
workoutExerciseRouter.get("/:workoutId", getExercisesForWorkout)
workoutExerciseRouter.put("/:workoutId/:exerciseId", updateExercisesForWorkout)

export default workoutExerciseRouter;