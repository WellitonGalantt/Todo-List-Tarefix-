// npx knex migrate:make categories --knexfile ./src/knexfile.ts
import { knex } from "knex";
import config from "../knexfile";

export const kenx = knex(config.development);