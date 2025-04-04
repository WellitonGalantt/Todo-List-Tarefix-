// npx knex migrate:make tasks --knexfile ./src/knexfile.ts
import { knex } from "knex";
import config from "../knexfile";

export const Knex = knex(config.development);