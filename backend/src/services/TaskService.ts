import { TaskModels } from "../models/TaskModel";
import { ICreateTask } from "../shared/types/taskInterfaces";



export class TaskService {

    static async createTask(taskData: ICreateTask): Promise<number | Array<string>> {
        const result = await TaskModels.createTask(taskData);
        return result;
    }

    static async getTaskById(taskId: number, userId: number): Promise<object | null> {
        const result = await TaskModels.getTaskById(taskId, userId); 
        return result;
    }

    static async getAllTasks(userId: number): Promise<Object | null> {
        const result = await TaskModels.getAllTasks(userId);
        return result;
    }

    static async updateTask(taskId: number, userId: number, taskData: Omit<ICreateTask, 'status_id'>): Promise<object | Error> {
        const result = await TaskModels.updateTask(taskId, userId, taskData);
        return result;
    }

    static async deleteTaskById(taskId: number, userId: number): Promise<object | null> {
        const result = await TaskModels.deleteTaskById(taskId, userId);
        return result;
    }

    static async completeTask(taskId: number, userId: number, status_id: number): Promise<object | null> {
        const result = await TaskModels.completeTask(taskId, userId, status_id);
        return result;
    }

    static async switchCategory(taskId: number, userId: number, category_id: number): Promise<object | null> {
        const result = await TaskModels.switchCategory(taskId, userId, category_id);
        return result;
    }
}