import { ETableNames } from "../database/ETableNames";
import { Knex } from "../database/knex";

export class CategoryModels{
    static async getAllCategories(): Promise<object | null> {
        return await Knex(ETableNames.CATEGORY).select('*').returning('*');
    }
}