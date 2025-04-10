import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryServices } from '../services/CategoryServices';
import { IReturnData } from "../shared/types/interfaces";

export class CategoryControllers {
    static async getAllCategories(req: Request, res: Response<IReturnData>) {
       const result = await CategoryServices.getAllCategories();
       if (!result) {
        res.status(StatusCodes.BAD_REQUEST).json({
            sucess: false,
            data: [],
            status: StatusCodes.BAD_REQUEST,
            message: "Erro ao buscar os categorias",
            error: [result]
        });
        return;
    }

    res.status(StatusCodes.OK).json({
        sucess: true,
        data: [result],
        status: StatusCodes.OK,
        message: "Categorias encontrados com sucesso",
        error: []
    });
    }
}