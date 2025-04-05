import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TaskService } from '../services/TaskService';
import { ICreateTask } from '../shared/types/taskInterfaces';


export class TaskControllers {

    static async createTask(req: Request<{}, {}, ICreateTask>, res: Response) {

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

    static async deleteTaskById(req: Request, res: Response) {
        const id = Number(req.params.id);
        const result = await TaskService.deleteTaskById(id);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao deletar a tarefa',
                error: result.message
            })
            return
        }

        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: result
        })
    }

    static async completeTask(req: Request<any, {}, { status_id: number }>, res: Response) {
        const id = Number(req.params.id);
        const status_id = req.body.status_id;
        if (!status_id) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao completar a tarefa',
                error: 'status_id é obrigatório'
            })
            return
        }
        const result = await TaskService.completeTask(id, status_id);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao completar a tarefa',
                error: result.message
            })
            return
        }

        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: result
        })
    }

    static async switchCategory(req: Request<any, {}, { category_id: number }>, res: Response) {
        const id = Number(req.params.id);
        const category_id = req.body.category_id;
        if (!category_id) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao mudar a categoria da tarefa',
                error: 'category_id é obrigatório'
            })
            return
        }
        const result = await TaskService.switchCategory(id, category_id);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Erro ao mudar a categoria da tarefa',
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