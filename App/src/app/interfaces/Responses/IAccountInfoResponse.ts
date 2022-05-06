import { IAccountInfo } from "../IAccountInfo";

export interface IAccountInfoResponse {
    status: number;
    message: string;
    infos: IAccountInfo;
}