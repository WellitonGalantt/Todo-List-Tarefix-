import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TaskService } from '../services/TaskService';
import { ICreateTask } from '../shared/types/taskInterfaces';
import { IReturnData, ITokenPayload} from "../shared/types/interfaces";


export class TaskControllers {

    static async createTask(req: Request<{}, {}, ICreateTask>, res: Response<IReturnData>) {
        const userId = (req.user as ITokenPayload)?.userId;
        req.body.user_id = userId;
        const result = await TaskService.createTask(req.body);
        if (result instanceof Array && result.length > 0) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao criar a tarefa!",
                error: [result]
            })
            return
        }

        res.status(StatusCodes.CREATED).json({
            sucess: true,
            data: [result],
            status: StatusCodes.CREATED,
            message: "Tarefa criada com sucesso!",
            error: []
        })
    }

    static async getTaskById(req: Request, res: Response) {

        const taskId = Number(req.params.id);
        const userId = (req.user as ITokenPayload)?.userId;
        const result = await TaskService.getTaskById(taskId, userId);

        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Tarefa não encontrada!",
                error: ["Erro ao encontrar a tarefa"]
            })
            return
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: [result],
            status: StatusCodes.OK,
            message: "Tarefa encontrada com sucesso!",
            error: []
        })
    }

    static async getAllTasks(req: Request, res: Response) {

        const userId = (req.user as ITokenPayload)?.userId;
        const result = await TaskService.getAllTasks(userId);

        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Voce ainda nao tem nenhuma tarefa!",
                error: ["Erro ao buscar as tarefas"]
            })
            return
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: [result],
            status: StatusCodes.OK,
            message: "Tarefas encontradas com sucesso!",
            error: []
        })
    }

    static async updateTask(req: Request<any, {}, Omit<ICreateTask, 'status_id'>>, res: Response) {

        const taskId = Number(req.params.id);
        const userId = (req.user as ITokenPayload)?.userId;
        const result = await TaskService.updateTask(taskId, userId, req.body);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao atualizar a tarefa!",
                error: [result.message]
            })
            return
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: [result],
            status: StatusCodes.OK,
            message: "Tarefa atualizada com sucesso!",
            error: []
        })

    }

    static async deleteTaskById(req: Request, res: Response) {
        const taskId = Number(req.params.id);
        const userId = (req.user as ITokenPayload)?.userId;
        const result = await TaskService.deleteTaskById(taskId, userId);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao deletar a tarefa!",
                error: [result.message]
            })
            return
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: [result],
            status: StatusCodes.OK,
            message: "Tarefa deletada com sucesso!",
            error: []
        })
    }

    static async completeTask(req: Request<any, {}, { status_id: number }>, res: Response) {
        const taskId = Number(req.params.id);
        const userId = (req.user as ITokenPayload)?.userId;
        const status_id = req.body.status_id;
        if (!status_id) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao completar a tarefa!",
                error: ["Deve ser emviado um status valido"]
            })
            return
        }
        const result = await TaskService.completeTask(taskId, userId, status_id);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao completar a tarefa!",
                error: [result.message]
            })
            return
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: [result],
            status: StatusCodes.OK,
            message: "Tarefa completada com sucesso!",
            error: []
        })
    }

    static async switchCategory(req: Request<any, {}, { category_id: number }>, res: Response) {
        const taskId = Number(req.params.id);
        const userId = (req.user as ITokenPayload)?.userId;
        const category_id = req.body.category_id;
        if (!category_id) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao mudar a categoria!",
                error: ["Deve ser emviado uma categoria valida"]
            })
            return
        }
        const result = await TaskService.switchCategory(taskId, userId, category_id);
        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao mudar a categoria!",
                error: [result.message]
            })
            return
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: [result],
            status: StatusCodes.OK,
            message: "Categoria trocada com sucesso!",
            error: []
        })
    }
}