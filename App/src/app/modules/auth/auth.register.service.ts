import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBasicResponse } from "src/app/interfaces/Responses/basic_response";


@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    
    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient) { }

    state_message: string = "";

    register(username_ : string, lastname_ : string, firstname_ : string, email_ : string, password_ : string) : void {

        const data = {
            username: username_,
            lastname: lastname_,
            firstname: firstname_,
            email: email_,
            password: password_
        }

        this.http.put<IBasicResponse>(this.ROOT_URL + '/register', data)
        .subscribe({
            next: (data) => {
                if (data.status === 201 && data.message === 'Account created')
                    this.state_message = "Account created";
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}