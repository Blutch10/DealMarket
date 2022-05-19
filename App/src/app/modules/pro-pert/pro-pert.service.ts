import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IWalletResponse } from "src/app/interfaces/Responses/IWalletResponse";


@Injectable({
    providedIn: 'root'
})
export class ProPertService {
    
    readonly ROOT_URL = 'http://127.0.0.1:8080/crypto';

    constructor(private http : HttpClient) { }

    getWallet() : Observable<IWalletResponse>
    {
        return this.http.get<IWalletResponse>(this.ROOT_URL + '/wallet', { withCredentials: true });
    }
}