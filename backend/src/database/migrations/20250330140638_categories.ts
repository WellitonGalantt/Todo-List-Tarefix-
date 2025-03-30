import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('status', table => {
        table.increments('id').primary().index();
        table.string('name').notNullable().unique();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('status');
}

