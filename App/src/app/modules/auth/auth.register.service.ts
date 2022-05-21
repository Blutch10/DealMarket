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
<<<<<<< HEAD
=======

        if (!username_) {
            this.snackBar.open('Please enter a Username', '', { duration: 2000 });
            return;
        }
        if (!lastname_) {
            this.snackBar.open('Please enter a Lastname', '', { duration: 2000 });
            return;
        }
        if (!firstname_) {
            this.snackBar.open('Please enter a Firstname', '', { duration: 2000 });
            return;
        }
        if (!email_) {
            this.snackBar.open('Please enter an Email', '', { duration: 2000 });
            return;
        }
        if (!email_.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
            this.snackBar.open('Please enter a valid Email!', '', { duration: 2000 });
            return;
        }
        if (!password_) {
            this.snackBar.open('Please enter a Password', '', { duration: 2000 });
            return;
        }
        if (password_.length < 8) {
            this.snackBar.open('Consider using a stronger Password!', '', { duration: 2000 });
            return;
        }

>>>>>>> f13ecc417ad962e86935d0357ec40ba1d3126334
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