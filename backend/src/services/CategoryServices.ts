import { CategoryModels } from "../models/CategoryModels";

export class CategoryServices {

    static async getAllCategories(): Promise<object | null> {
        const result = await CategoryModels.getAllCategories();
        return result;
    }
}