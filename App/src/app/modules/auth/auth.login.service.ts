import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { IBasicResponse } from "src/app/interfaces/basic_response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticated: boolean = false;
    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient) { }

    login(username_ : string, password_ : string) : void {

        const data = {
            username: username_,
            password: password_
        }

        this.http.post<IBasicResponse>(this.ROOT_URL + '/login', data)
        .subscribe({
            next: (data) => {
                if (data.status === 200 && data.message === 'Successful authentication')
                    this.isAuthenticated = true;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }


    logout() : void {
        this.http.get<IBasicResponse>(this.ROOT_URL + '/logout')
        .subscribe({
            next: (data) => {
                if (data.status === 200 && data.message === 'Successful logout')
                    this.isAuthenticated = false;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
