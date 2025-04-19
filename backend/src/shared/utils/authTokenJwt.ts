import jwt from 'jsonwebtoken';
import { ITokenPayload } from '../types/interfaces'
import 'dotenv/config';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (id: number, role: string): string | Error => {
    if (!JWT_SECRET) {
        return new Error('Nao foi encontrado a SECRET key!')
    }

    return jwt.sign({ userId: id, role: role }, JWT_SECRET, { expiresIn: '1h' });
}

export const verifyToken = (token: string): ITokenPayload | Error => {
    if (!JWT_SECRET) {
        return new Error('Nao foi encontrado a SECRET key!')
    }
    try {
        return jwt.verify(token, JWT_SECRET) as ITokenPayload;
    }
    catch (error: any) {
        return error;
    }



}
