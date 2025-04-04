import { Knex } from "knex";
import dotenv from 'dotenv';
dotenv.config();

const config: { [key: string]: Knex.Config} = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: Number(process.env.DB_PORT),
            password: process.env.DB_PASSWORD,
            database: process.env.DB
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds',
        },
        useNullAsDefault: true
    }
}

export default config;