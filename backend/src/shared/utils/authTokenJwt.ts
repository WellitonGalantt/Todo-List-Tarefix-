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
    console.log('secret '+ JWT_SECRET)
    return jwt.sign({ userId: id, role: role }, JWT_SECRET, { expiresIn: '1h' });
}

export const verifyToken = (token: string): string | Error => {
    if (!JWT_SECRET) {
        return new Error('Nao foi encontrado a SECRET key!')
    }

    console.log('secret '+ JWT_SECRET)
    const decoded = jwt.verify(token, JWT_SECRET) as ITokenPayload;
    console.log('DESCODED '+decoded)
    return ''

}
