import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.USER, (table) =>{
        table.bigIncrements('id').primary().index();
        table.string('name', 150).notNullable();
        table.string('email').unique().notNullable();
        table.string('senha').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.USER)
}

