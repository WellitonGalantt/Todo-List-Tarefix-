import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { StatusServices } from '../services/StatusService';
import { IReturnData } from "../shared/types/interfaces";



export class StatusControllers {
    static async getAllStatus(req: Request, res: Response<IReturnData>) {
        const result = await StatusServices.getAllStatus();
        if (!result) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao buscar os status",
                error: [result]
            });
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: [result],
            status: StatusCodes.OK,
            message: "Status encontrados com sucesso",
            error: []
        });
    }
}