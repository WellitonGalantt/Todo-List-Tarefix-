import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
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
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        if(!token){
            res.status(StatusCodes.UNAUTHORIZED).json({
                sucess: false,
                data: [],
                status: StatusCodes.UNAUTHORIZED,
                message: "Erro pegar o token no header!",
                error: new Error('Token nao encontrado!')
            })
            return;
        }
        // console.log('Token:' + token)

        const tokenDecoded = verifyToken(token);
        if(tokenDecoded instanceof Error){
            res.status(StatusCodes.UNAUTHORIZED).json({
                sucess: false,
                data: [],
                status: StatusCodes.UNAUTHORIZED,
                message: "Erro ao decodificar o token!",
                error: tokenDecoded
            })
            return;
        }
        req.user = tokenDecoded;
        next();
        return;
    }

}