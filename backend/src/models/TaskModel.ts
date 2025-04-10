import { Knex } from "../database/knex";
import { ICreateTask } from "../shared/types/taskInterfaces";
import { ETableNames } from "../database/ETableNames";
import { IReturnData } from "../shared/types/interfaces";

export class TaskModels {

    static async createTask(taskData: ICreateTask): Promise<number | Array<string>> {

        const errors = [];

        const existCategory = await Knex(ETableNames.CATEGORY).select('id').where('id', taskData.category_id).first();
        if (!existCategory) errors.push('Essa categoria não existe');

        const existStatus = await Knex(ETableNames.STATUS).select('id').where('id', taskData.status_id).first();
        if (!existStatus) errors.push('Esse status não existe');

        if (errors.length > 0) return errors;

        const { title, description, status_id, category_id } = taskData;

        const startDate = new Date();

        const [idTask] = await Knex(ETableNames.TASK).insert(
            {
                title,
                description,
                status_id,
                category_id,
                start_date: startDate.toISOString(),
                finish_date: startDate.toISOString(),
                user_id: 1
            }
        ).returning('id');

        return idTask;
    }

    static async getTaskById(id: number): Promise<object | null> {
        return await Knex(ETableNames.TASK).select('*').where('id', id).first().returning('*');
    }

    static async getAllTasks(): Promise<Object | null> {
        return await Knex(ETableNames.TASK).select('*').returning('*');
    }

    static async updateTask(id: number, taskData: Omit<ICreateTask, 'status_id'>): Promise<object | Error> {
        const verifyTask = await this.getTaskById(id);
        // O this se refere a instancia atual da classe
        // E ja que o metodo é estático pode ocorrer alguns erros
        // const verifyTask = await TaskModels.getTaskById(id);
        if (!verifyTask) return new Error('Tarefa não encontrada');
        const result = Knex(ETableNames.TASK).update(taskData).where('id', id).returning('*');
        return result;
    }

    static async deleteTaskById(id: number): Promise<object | null> {
        const result = await Knex(ETableNames.TASK).delete().where('id', id).returning('*');
        return result;
    }

    static async completeTask(id: number, status_id: number): Promise<object | null> {
        const statusVerify = await Knex(ETableNames.STATUS).select('id').where('id', status_id).first();
        if (!statusVerify) return new Error('Status não encontrado');
        const verifyTask = await this.getTaskById(id);
        if (!verifyTask) return new Error('Tarefa não encontrada');
        const result = await Knex(ETableNames.TASK).update({status_id: status_id}).where('id', id).returning('*');
        return result;
    }

    static async switchCategory(id: number, category_id: number): Promise<object | null> {
        const categoryVerify = await Knex(ETableNames.CATEGORY).select('id').where('id', category_id).first();
        if (!categoryVerify) return new Error('Categoria não encontrada');
        const verifyTask = await this.getTaskById(id);
        if (!verifyTask) return new Error('Tarefa não encontrada');
        const result = await Knex(ETableNames.TASK).update({category_id: category_id}).where('id', id).returning('*');
        return result;
    }

}
