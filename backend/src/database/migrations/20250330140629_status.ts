import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.STATUS, (table)=>{
        table.bigIncrements('id').primary().index();
        table.string('name').notNullable().unique();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.STATUS)
}

