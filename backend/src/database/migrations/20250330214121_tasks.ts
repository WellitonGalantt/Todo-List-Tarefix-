import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(ETableNames.TASK, (table) =>{
        table.bigIncrements('id').primary().index();
        table.string('title', 150).index().notNullable();
        table.string('description', 255).notNullable();
        table.dateTime('start_date').notNullable();
        table.dateTime('finish_date').notNullable();
        table.integer('status_id').unsigned().references('status.id').notNullable();
        table.integer('user_id').unsigned().references('usuarios.id').notNullable();
        table.integer('category_id').unsigned().references('categorias.id').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(ETableNames.TASK)
}

