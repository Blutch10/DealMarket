import { ICoinCandle } from "../ICoinCandle";

export interface ICandleResponse {

    status: number;
    message: string;
    candles: ICoinCandle[];

}