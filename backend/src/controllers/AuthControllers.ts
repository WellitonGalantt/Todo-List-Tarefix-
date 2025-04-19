import { Request, Response } from 'express';
import { IUserRegister, IUserLogin } from '../shared/types/userInterfaces';
import { AuthServices } from "../services/AuthServices"
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../shared/utils/authTokenJwt'

export class AuthController {

    static async loginUser(req: Request<{}, {}, IUserLogin>, res: Response) {
        const userData = req.body;
        const result = await AuthServices.loginUser(userData);

        if (result instanceof Error) {
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao logar usuario!",
                error: result.message
            })
            return;
        }

        const token = generateToken(result, 'user');
        if(token instanceof Error){
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro gerar o token!",
                error: token
            })
            return;
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: result,
            status: StatusCodes.OK,
            message: "Usuario logado com sucesso!",
            error: [],
            token: token
        })
    }

    static async registerUser(req: Request<{}, {}, IUserRegister>, res: Response) {
        const userData = req.body;

        const result = await AuthServices.registerUser(userData);

        if (result instanceof Error) {
            console.log(result)
            res.status(StatusCodes.BAD_REQUEST).json({
                sucess: false,
                data: [],
                status: StatusCodes.BAD_REQUEST,
                message: "Erro ao registrar usuario!",
                error: result.message
            })
            return
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            data: result,
            status: StatusCodes.OK,
            message: "Usuario registrado com sucesso!",
            error: []
        })
    }
}