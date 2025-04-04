import { TaskModels } from "../models/TaskModel";
import { ICreateTask } from "../shared/types/taskInterfaces";


export class TaskService {

    static async createTask(taskData: ICreateTask): Promise<number | Array<string>> {
        const result = await TaskModels.createTask(taskData);
        console.log(result);
        return result;
    }

    static async getTaskById(id: number): Promise<object | null> {
        const result = await TaskModels.getTaskById(id);
        return result;
    }

    static async getAllTasks(): Promise<Object | null> {
        const result = await TaskModels.getAllTasks();
        return result;
    }

    static async updateTask(id: number, taskData: Omit<ICreateTask, 'status_id'>): Promise<object | Error> {
        const result = await TaskModels.updateTask(id, taskData);
        return result;
    }
}