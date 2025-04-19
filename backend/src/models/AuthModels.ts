import { Knex } from "../database/knex";
import { IUserLogin, IUserRegister } from "../shared/types/userInterfaces"
import { ETableNames } from "../database/ETableNames"
import { EncriptPassword } from "../services/EncriptPassword";



export class AuthModels {
    static async registerUser(data: IUserRegister): Promise<number | Error> {

        const { name, email, password } = data;

        try {
            const existUser = await Knex(ETableNames.USER).where('email', data.email).first();
            if (existUser) {
                return new Error('Usuario com esse email ja esta registrado!')
            }

            const hashedPassword = await EncriptPassword.encriptPassword(password);

            const [idUser] = await Knex(ETableNames.USER).insert({
                name: name,
                email: email,
                senha: hashedPassword
            }).returning('id');

            return idUser;
        } catch (error) {
            if (error instanceof Error) {
                return new Error(error.message)
            } else {
                return new Error('Um error desconhecido aconteceu: ' + error)
            }

        }
    }

    static async loginUser(data: IUserLogin): Promise<number | Error> {

        try {
            const existUser = await Knex(ETableNames.USER).where('email', data.email).first();
            if (!existUser) {
                return new Error('Usuario com esse email nao existe!');
            }

            const verifyPassword = await EncriptPassword.verifyPassword(data.password, existUser.senha);

            if (!verifyPassword) {
                return new Error('Senha incorreta!');
            }

            return existUser.id;

        }
        catch (error) {
            if (error instanceof Error) {
                return new Error(error.message);
            } else {
                return new Error('Um error desconhecido aconteceu: ' + error)
            }
        }

    }
}