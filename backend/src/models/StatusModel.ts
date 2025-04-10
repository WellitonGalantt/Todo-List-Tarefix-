import { Knex } from "../database/knex";
import { ETableNames } from "../database/ETableNames";


export class StatusModels {
    static async getAllStatus(): Promise<object | null> {
        return await Knex(ETableNames.STATUS).select('*').returning('*');
    }
}