import "reflect-metadata";
import * as express from "express";
import { AppDataSource } from "./configuration/data-source";

const app = express();
const PORT = process.env.DB_PORT;

app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

app.get("/", (req, res) => {
    res.send("Hello, Fitness App!");
});
