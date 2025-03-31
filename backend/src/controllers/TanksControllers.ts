import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export class TanksControllers {

    static async getAllTasks(req: Request, res: Response) {
        
        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: []
        })
    }
}