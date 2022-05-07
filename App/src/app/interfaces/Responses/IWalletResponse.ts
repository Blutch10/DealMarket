import { IWallet } from "../IWallet";

export interface IWalletResponse {

    status: number;
    message: string;
    userWallet: Object;
    
}