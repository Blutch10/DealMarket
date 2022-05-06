import { ITransaction } from "../ITransaction";

export interface IHistoryResponse {

    status: number;
    message: string;
    ops: ITransaction[];
    
}