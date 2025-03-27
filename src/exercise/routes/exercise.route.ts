import { Router } from "express";
import { createExercise, getAllExercises, getExerciseByName, getExercisesByCategory } from "../exercise.controller";
import { updateExercise, deleteExercise } from "../exercise.controller";

const exerciseRouter = Router()

exerciseRouter.post("/create-exercise", createExercise)
exerciseRouter.get("/get-all", getAllExercises)
exerciseRouter.get("/:name", getExerciseByName);
exerciseRouter.get("/category/:category", getExercisesByCategory);
exerciseRouter.put("/:id", updateExercise);
exerciseRouter.delete("/:id", deleteExercise);


export default exerciseRouter