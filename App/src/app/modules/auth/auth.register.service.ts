import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBasicResponse } from "src/app/interfaces/Responses/basic_response";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    
    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient) { }

    register(username_ : string, lastname_ : string, firstname_ : string, email_ : string, password_ : string) : void {
        const data = {
            username: username_,
            lastname: lastname_,
            firstname: firstname_,
            email: email_,
            password: password_
        }

        this.http.put<IBasicResponse>(this.ROOT_URL + '/register', data, { withCredentials: true }).subscribe({
            next: val => console.log("Account created"),
            error: err => console.log(err)
        });
    }
}