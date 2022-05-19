import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IBasicResponse } from "../../interfaces/Responses/basic_response"

@Injectable({
    providedIn: 'root'
})
export class BuySellService {

    readonly ROOT_URL = 'http://127.0.0.1:8080/crypto';

    
    constructor(private http : HttpClient) { }


    buyCoin(symbol_: string, quantity_: number) : Observable<IBasicResponse>
    {
        let data = {  
            symbol: symbol_,
            quantity: quantity_
        };
        return this.http.post<IBasicResponse>(this.ROOT_URL + '/buy', data, { withCredentials: true });
    }


    sellCoin(symbol_: string, quantity_: number) : Observable<IBasicResponse>
    {
        let data = {  
            symbol: symbol_,
            quantity: quantity_
        };
        return this.http.post<IBasicResponse>(this.ROOT_URL + '/sell', data, { withCredentials: true });
    }
}