import { Api } from '../../shared/api';
import { ObjectLiteral } from '../../shared/objectLiteral';

export class ApiMock implements Api {

    get<T>(url: string): Promise<T> {
        throw new Error("Method not implemented.");
    }

    post<T>(url: string, jsonData: ObjectLiteral): Promise<T> {
        throw new Error("Method not implemented.");
    }
    put<T>(url: string, jsonData: ObjectLiteral): Promise<T> {
        throw new Error("Method not implemented.");
    }
    patch<T>(url: string, jsonData: ObjectLiteral): Promise<T> {
        throw new Error("Method not implemented.");
    }
    del<T>(url: string): Promise<T> {
        throw new Error("Method not implemented.");
    }





}