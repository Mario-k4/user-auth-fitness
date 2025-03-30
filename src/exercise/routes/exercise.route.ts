import { Router } from "express";
import { createExercise, getAllExercises, getCategories, getExerciseByName, getExercisesByCategory } from "../exercise.controller";
import { updateExercise, deleteExercise } from "../exercise.controller";

const exerciseRouter = Router()

exerciseRouter.post("/create-exercise", createExercise)
exerciseRouter.get("/get-all", getAllExercises)
exerciseRouter.get("/name/:name", getExerciseByName);
exerciseRouter.get("/categories/:category", getExercisesByCategory);
exerciseRouter.put("/:id", updateExercise);
exerciseRouter.delete("/:id", deleteExercise);
exerciseRouter.get("/categories", getCategories)


export default exerciseRouter