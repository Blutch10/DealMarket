import { Component, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { changePasswordService } from "./changepass.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './changepass.component.html',
    styleUrls: ['./changepass.component.css']
})
export class ChangePassword implements OnDestroy {

    sub!: Subscription;
    UI_message: string = "";
    UI_message_state: string = "NEUTRAL";
    
    oldPass = new FormControl('');
    oldPassword: string = "";
    newPass = new FormControl('');
    newPassword: string = "";
    showOldPass: boolean = false;
    showNewPass: boolean = false;

    constructor(private change: changePasswordService, private router: Router) { }

    changePassword() : void {
        if (this.oldPassword === "" || this.newPassword === "") {
            this.UI_message = "Error : You need to enter a password";
            this.UI_message_state = "ERROR";
        }
        else
            this.sub = this.change.changePassword(this.oldPassword, this.newPassword).subscribe({
                next: val => {
                    this.UI_message = "Password successfully changed";
                    this.UI_message_state = "SUCCESS";
                    setTimeout(() => this.router.navigate(['/dashboard']), 1500);
                },
                error: err => {
                    this.UI_message = "Error : Password unchanged";
                    this.UI_message_state = "ERROR";
                }
            });
    }


    ngOnDestroy()
    {
        if (this.sub)
            this.sub.unsubscribe();
    }

    
    changeVisibility1() : void {
        this.showOldPass = ! this.showOldPass;
    }

    changeVisibility2() : void {
        this.showNewPass = ! this.showNewPass;
    }
}