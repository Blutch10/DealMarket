import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IHistoryResponse } from "src/app/interfaces/Responses/IHistoryResponse";


@Injectable({
    providedIn: 'root'
})
export class HistService {
    
    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient) { }

    getHistory() : Observable<IHistoryResponse>
    {
        return this.http.get<IHistoryResponse>(this.ROOT_URL + '/history', { withCredentials: true });
    }
}