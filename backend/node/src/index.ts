import { AppDataSource } from "./config/appDataSource";
import { Profile } from "../src/domain/entity/profiles.entity";
import { Category } from "../src/domain/entity/categories.entity";
import { Article } from "../src/domain/entity/articles.entity";

import * as dotenv from 'dotenv';

dotenv.config();

export const start = async () => {
    console.log({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.POSTGRES_DB,
    });
    console.log("start");
    try {
        const dataSource = await AppDataSource.initialize();

        const users = await dataSource
            .getRepository(Profile)
            .find();
        
        const categories = await dataSource
            .getRepository(Category)
            .find();
        
        const articles = await dataSource
            .getRepository(Article)
            .find();

        console.log(users);
        console.log(categories);
        console.log(articles);

    } catch (error) {
        console.error("DB connection error", error);
    }
};

start().catch(console.error);