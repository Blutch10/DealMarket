import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { ICandleResponse } from "src/app/interfaces/Responses/ICandleResponse";
import { IPriceResponse } from "src/app/interfaces/Responses/IPriceResponse";

@Injectable({
    providedIn: 'root'
})
export class CandleStickService {

    readonly ROOT_URL = 'http://127.0.0.1:8080/crypto';

    constructor(private http : HttpClient) { }

    getCandles(symbol_: string) : Observable<ICandleResponse>
    {
        let data = {  
            symbol: symbol_
        };
        return this.http.post<ICandleResponse>(this.ROOT_URL + '/coinCandles', data, { withCredentials: true });
    }

    getPrice(symbol_: string) : Observable<IPriceResponse>
    {
        let data = {
            symbol: symbol_
        };
        return this.http.post<IPriceResponse>(this.ROOT_URL + '/coinPrice', data, { withCredentials: true });
    }
}