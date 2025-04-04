import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { IUserRegister } from '../shared/types/userInterfaces';

export class Middlewares {

    static validateSchema(schema: yup.ObjectSchema<any>) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                await schema.validate(req.body, {abortEarly: false});
                next();
                return;
            }catch(error) {
                const yupErrors = error as yup.ValidationError;
                res.status(400).json({
                    message: 'Erro ao validar o schema',
                    error: yupErrors.errors
                })
                return;
            }
        }
    }

}