import { Request, Response } from 'express';
import { IUserRegister, IUserLogin } from '../shared/types/userInterfaces';
import { StatusCodes } from 'http-status-codes';

export class AuthController {

    static async postLogin(req: Request<{}, {}, IUserLogin>, res: Response) {
        const userData = req.body;

        if( !userData.email || !userData.password ) {
            res.status(StatusCodes.BAD_REQUEST).json({
                message: 'Email e senha são obrigatórios'
            })
            return;
        }

        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: userData
        })
    }

    static async postRegister(req: Request<{}, {}, IUserRegister>, res: Response) {
        const userData = req.body;

        res.status(StatusCodes.OK).json({
            message: 'Sucesso',
            data: userData
        })
    }
}