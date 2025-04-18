import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { IUserRegister } from '../shared/types/userInterfaces';
import { StatusCodes } from 'http-status-codes';
import { IReturnData } from '../shared/types/interfaces';

export class Middlewares {

    static validateSchema(schema: yup.ObjectSchema<any>) {
        return async (req: Request, res: Response<IReturnData>, next: NextFunction) => {
            try{
                await schema.validate(req.body, {abortEarly: false});
                next();
                return;
            }catch(error) {
                const yupErrors = error as yup.ValidationError;
                res.status(400).json({
                    sucess: false,
                    data: [],
                    status: StatusCodes.BAD_REQUEST,
                    message: "Erro ao criar a tarefa!",
                    error: [yupErrors.errors]
                })
                return;
            }
        }
    }

}