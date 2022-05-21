import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { IBasicResponse } from "src/app/interfaces/Responses/basic_response";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticated: boolean = false;
    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient, private router: Router) { }

    login(username_ : string, password_ : string) : void {

        if (!username_) {
            this.snackBar.open('Please enter a Username', '', { duration: 2000 });
            return;
        }
        if (!password_) {
            this.snackBar.open('Please enter a Password', '', { duration: 2000 });
            return;
        }

        const data = {
            username: username_,
            password: password_
        }
        
        this.http.post<IBasicResponse>(this.ROOT_URL + '/login', data, { withCredentials: true })
        .subscribe({
            next: (data) => {
                if (data.status === 200 && data.message === 'Successful authentication') {
                    this.isAuthenticated = true;
                    this.router.navigate(['trading']);
                }
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
                    this.router.navigate(['']);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
