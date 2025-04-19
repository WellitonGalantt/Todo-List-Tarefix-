import { Request } from "express";

export interface IReturnData {
    sucess: boolean;
    data: Array<any>;
    status: number;
    message: string;
    error: Array<any>;
}

export interface ITokenPayload {
    id: number;
    role: string;
}

export interface AuthRequest extends Request {
    user?: ITokenPayload;
}