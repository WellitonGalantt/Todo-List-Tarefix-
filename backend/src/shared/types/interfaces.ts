
export interface IReturnData<T> {
    sucess: boolean;
    data: object;
    status: number;
    message: string;
    error: T | null;
}