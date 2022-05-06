import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IAccountInfoResponse } from "src/app/interfaces/Responses/IAccountInfoResponse";

@Injectable({
    providedIn: 'root'
})
export class AccountInfoService {
    
    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient) { }

    getInfos() : Observable<IAccountInfoResponse>
    {
        return this.http.get<IAccountInfoResponse>(this.ROOT_URL + '/infos', { withCredentials: true });
    }
}