import { StatusModels } from "../models/StatusModel";


export class StatusServices {

    static async getAllStatus(): Promise<object | null> {
        const result = await StatusModels.getAllStatus();
        return result;
    }
}