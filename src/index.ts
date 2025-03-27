import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./configuration/data-source";
import userRouter from "./user/routes/user.route";
import authRouter from "./auth/auth.route";
import cookieParser from "cookie-parser";
import twoFactorAuthRouter from "./2FA/twoFactorAuth.route";
import cors from "cors";
import workoutRouter from "./workout/routes/workout.route";
import exerciseRouter from "./exercise/routes/exercise.route";
import workoutExerciseRouter from "./workoutExercise/routes/workoutExercise.route";

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
    cors({
        origin: FRONTEND_URL, // Allow frontend to access backend
        credentials: true, // Allow cookies (important for auth)
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(`${API_URL}`, userRouter);
app.use(`${API_URL}`, authRouter);
app.use(`${API_URL}`, twoFactorAuthRouter);
app.use(`${API_URL}/workouts`, workoutRouter);
app.use(`${API_URL}/exercises`, exerciseRouter);
app.use(`${API_URL}/workout-exercises`, workoutExerciseRouter);

AppDataSource.initialize()
    .then(() => {
        console.log("📦 Database connected successfully");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ Error connecting to the database:", error);
    });

app.get("/", (req, res) => {
    res.send("Hello, Fitness App!");
});
