import { Knex } from "knex";

const config: { [key: string]: Knex.Config} = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            user: 'postgres',
            port: 5432,
            password: '123',
            database: 'tarefix'
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