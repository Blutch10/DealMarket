import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IPriceResponse } from "../../interfaces/Responses/IPriceResponse";

@Injectable({
    providedIn: 'root'
})
export class PerformanceService {

    readonly ROOT_URL = 'http://127.0.0.1:8080/crypto';

    constructor(private http: HttpClient) {}

    /**
     * Makes a request to get the user's wallet value.
     * @param wallet_ The user's wallet object.
     * @returns An Observable on the server's response.
     */
    getWalletValue(wallet_: Object) : Observable<IPriceResponse> {
        const data = {
            wallet: wallet_
        }
        return this.http.post<IPriceResponse>(this.ROOT_URL + '/walletValue', data, { withCredentials: true })
    }
}