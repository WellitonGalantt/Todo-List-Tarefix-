import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { IUserRegister } from '../shared/types/userInterfaces';
import { StatusCodes } from 'http-status-codes';
import { IReturnData } from '../shared/types/interfaces';
import { AuthRequest } from '../shared/types/interfaces';
import { verifyToken } from '../shared/utils/authTokenJwt';

export class Middlewares {

    static validateSchema(schema: yup.ObjectSchema<any>) {
        return async (req: Request, res: Response<IReturnData>, next: NextFunction) => {
            try{
                await schema.validate(req.body, {abortEarly: false});
                next();
                return;
            }catch(error) {
                const yupErrors = error as yup.ValidationError;
                res.status(StatusCodes.BAD_REQUEST).json({
                    sucess: false,
                    data: [],
                    status: StatusCodes.BAD_REQUEST,
                    message: "Erro ao registrar usuario!",
                    error: [yupErrors.errors]
                })
                return;
            }
        }
    }

    static authValidate(req: AuthRequest, res: Response, next: NextFunction){
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro pegar o token no header!",
                error: new Error('Token nao encontrado!')
            })
            return;
        }
        console.log('Token:' + token)

        const tokenVerify = verifyToken(token);
        console.log('Token verify: ' + tokenVerify)

        next();
        return;
    }

}