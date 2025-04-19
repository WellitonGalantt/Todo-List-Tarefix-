import { AuthModels } from "../models/AuthModels"
import { IUserLogin, IUserRegister } from "../shared/types/userInterfaces"

export class AuthServices {
    static async registerUser(data: IUserRegister): Promise<number | Error> {
        console.log(data);
        const result = AuthModels.registerUser(data);
        return result;
    }

    static async loginUser(data: IUserLogin): Promise<number | Error> {
        const result = AuthModels.loginUser(data);
        return result;
    }
}