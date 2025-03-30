import { Request, Response } from "express";
import { ExerciseService } from "./exercise.service";
import { ExerciseCategory } from "../core/enums/exercise-category.enum";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { UpdateExerciseDto } from "./dto/update-exercise.dto";
import { Exercise } from "./entities/exercise.entity";

const exerciseService = new ExerciseService();

export const createExercise = async (req: Request, res: Response): Promise<void> => {
    const { name, category, isPredefined } = req.body;
    const createExerciseDto: CreateExerciseDto = { name, category, isPredefined };
    try {
        const exercise = await exerciseService.createExercise(createExerciseDto);
        res.status(201).json(exercise);
    } catch (error) {
        console.error("Error creating exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllExercises = async (req: Request, res: Response): Promise<void> => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.status(200).json(exercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getExerciseByName = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.params;
        const exercise = await exerciseService.getExerciseByName(name);
        if (!exercise) {
            res.status(404).json({ message: "Exercise not found" });
        } else {
            res.status(200).json(exercise);
        }
    } catch (error) {
        console.error("Error fetching exercise by name:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCategories = async (_: Request, res: Response): Promise<void> => {
    try {
        const categories = await exerciseService.getDistinctCategories();

        if (categories.length === 0) {
            res.status(404).json({ message: "No categories found" });
            return;
        }

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getExercisesByCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category } = req.params;
        const categoryEnum = category as ExerciseCategory;
        if (!Object.values(ExerciseCategory).includes(categoryEnum)) {
            res.status(400).json({ message: "Invalid category" });
            return;
        }
        const exercises = await exerciseService.getExercisesByCategory(categoryEnum);
        if (!exercises || exercises.length === 0) {
            res.status(404).json({ message: "No exercises found for the given category" });
        } else {
            res.status(200).json(exercises);
        }
    } catch (error) {
        console.error("Error fetching exercises by category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateExercise = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updateExerciseDto: UpdateExerciseDto = req.body;
    try {
        const updatedExercise = await exerciseService.updateExercise(id, updateExerciseDto);
        if (!updatedExercise) {
            res.status(404).json({ message: "Exercise not found" });
        } else {
            res.status(200).json(updatedExercise);
        }
    } catch (error) {
        console.error("Error updating exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteExercise = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deleted = await exerciseService.deleteExercise(id);
        if (!deleted) {
            res.status(404).json({ message: "Exercise not found" });
        } else {
            res.status(200).json({ message: "Exercise deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting exercise:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};