import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBasicResponse } from "src/app/interfaces/Responses/basic_response";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    
    readonly ROOT_URL = 'http://127.0.0.1:8080/user';

    constructor(private http : HttpClient, private snackBar: MatSnackBar) { }

    state_message: string = "";

    register(username_ : string, lastname_ : string, firstname_ : string, email_ : string, password_ : string) : void {

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
                if (error.message === 'INVALID_CREDENTIAL_EXCEPTION') {
                    this.snackBar.open('Invalid Email or Password!', '', { duration: 2000 });
                  } else if (error.message === 'EMAIL_ALREADY_EXISTS') {
                    this.snackBar.open('This Email is already used!', '', { duration: 2000 });
                  } else if (error.message === 'SOME_INTERNAL_ERROR_OCCURRED') {
                    this.snackBar.open('Something went wrong!', '', { duration: 2000 });
                }
                console.log(error);
            }
        });
    }
}