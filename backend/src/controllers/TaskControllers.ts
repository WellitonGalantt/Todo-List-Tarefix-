import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TaskService } from '../services/TaskService';
import { ICreateTask } from '../shared/types/taskInterfaces';


export class TaskControllers {

    static async createTask(req: Request<{}, {}, ICreateTask> , res: Response) {

        const result = await TaskService.createTask(req.body);
        console.log(result);
        if (result instanceof Array && result.length > 0) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao criar a tarefa',
                error: result
            })
            return
        }

        res.status(StatusCodes.CREATED).json({
            message: 'Sucesso',
            data: [result]
        })
    }

    static async getTaskById(req: Request, res: Response) {

        const id = Number(req.params.id);
        const result = await TaskService.getTaskById(id);

        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao buscar a tarefa',
                error: 'Tarefa não encontrada'
            })
            return
        }

        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: [result]
        })
    }

    static async getAllTasks(req: Request, res: Response) {

        const result = await TaskService.getAllTasks();

        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao buscar as tarefas',
                error: 'Ainda nao à nenhuma tarefa cadastrada'
            })
            return
        }

        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: result
        })
    }

    static async updateTask(req: Request<any, {}, Omit<ICreateTask, 'status_id'>>, res: Response) {
        
        const id = Number(req.params.id);
        const result = await TaskService.updateTask(id, req.body);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao atualizar a tarefa',
                error: result.message
            })
            return
        }

        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: result
        })

    }
}