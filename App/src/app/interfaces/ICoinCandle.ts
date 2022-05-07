import { ICandle } from "./ICandle";

export interface ICoinCandle {
    
    candle: {
        openTime: Date,
        open: number,
        high: number,
        low: number,
        close: number
    };
    volume: number;

}