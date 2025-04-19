import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IReturnData {
    sucess: boolean;
    data: Array<any>;
    status: number;
    message: string;
    error: Array<any>;
}

export interface ITokenPayload extends  JwtPayload{
    id: number;
    role: string;
}

export interface AuthRequest extends Request {
    user?: ITokenPayload;
}
