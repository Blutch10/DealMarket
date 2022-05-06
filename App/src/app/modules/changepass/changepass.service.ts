import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IBasicResponse } from "src/app/interfaces/Responses/basic_response";

@Injectable({
    providedIn: 'root'
})
export class changePasswordService {

    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient) { }

    
    changePassword(oldPassword_: string, newPassword_: string) : Observable<IBasicResponse>
    {
        const data = {
            oldPassword: oldPassword_,
            newPassword: newPassword_
        }
        return this.http.put<IBasicResponse>(this.ROOT_URL + '/resetPassword', data, { withCredentials: true });
    }
    
}