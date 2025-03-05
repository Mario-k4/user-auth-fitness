import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./configuration/data-source";
import userRouter from "./user/routes/user.route";

const app = express();
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL

app.use(express.json());
app.use(`${API_URL}`, userRouter);

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
