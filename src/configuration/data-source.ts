import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { join } from 'path'


dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
    entities: [join(__dirname, '..', '**', 'entities', '*.entity.{ts,js}')],
    subscribers: [],
    migrationsRun: true,
    ssl: false,
});
