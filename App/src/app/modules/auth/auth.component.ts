import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from './auth.login.service';
import { RegisterService } from './auth.register.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out',
              style({ height: 76, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 76, opacity: 1 }),
            animate('0.3s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ],
    ),
  ],
})
export class AuthComponent implements OnDestroy {
  
  username = new FormControl('');
  username_ : string = "";
  firstname = new FormControl('');
  firstname_ : string = "";
  lastname = new FormControl('');
  lastname_ : string = "";
  email = new FormControl('');
  email_ : string = "";
  
  name = new FormControl('');
  name_ : string = "";
  password = new FormControl('');
  password_ : string = "";
  showPassword: boolean = false;

  authType: 'REGISTER' | 'LOGIN' = 'LOGIN';

  UI_Message: string = "";
  UI_Message_state: string = "NEUTRAL";

  sub!: Subscription;
  
  constructor(private auth : AuthService, private reg : RegisterService, private router: Router) { }
  

  ngOnDestroy(): void {
    if (this.sub)
      this.sub.unsubscribe();
  }


  /**
   * Choose to display or not the password.
   */
  changeVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  /**
   * Change between Register or Login form.
   */
  changeGoal(): void {
    this.authType= (this.authType === 'LOGIN') ? 'REGISTER' : 'LOGIN';
  }


  /**
   * The action toperform when clicking on Login or Register button.
   * Includes fieldequirement checks.
   */
  submitButtonFunc() : void {
    if (this.authType === 'LOGIN') {
      if (this.username_ === "") {
        this.UI_Message = "Error : missing username";
        this.UI_Message_state = "ERROR";
      }
      else if (this.password_ === "") {
        this.UI_Message = "Error : missing password";
        this.UI_Message_state = "ERROR";
      }
      else {
        this.login();
      }
    }
      
    if (this.authType === 'REGISTER') {
      if (this.username_ === "") {
        this.UI_Message = "Error : missing username";
        this.UI_Message_state = "ERROR";
      }
      else if (this.password_ === "") {
        this.UI_Message = "Error : missing password";
        this.UI_Message_state = "ERROR";
      }
      else if (this.lastname_ === "") {
        this.UI_Message = "Error : missing lastname";
        this.UI_Message_state = "ERROR";
      }
      else if (this.firstname_ === "") {
        this.UI_Message = "Error : missing firstname";
        this.UI_Message_state = "ERROR";
      }
      else if (this.firstname_ === "") {
        this.UI_Message = "Error : missing email";
        this.UI_Message_state = "ERROR";
      }
      else {
        this.register();
      }
    }
  }


  /**
   * The login method.
   */
  login() : void {
    this.auth.login(this.username_, this.password_);
  }


  /**
   * The register method. If the registration is successful, automatically logs in the user.
   */
  register() : void {
    this.sub = this.reg.register(this.username_, this.lastname_, this.firstname_, this.email_, this.password_).subscribe({
      next: res => {
        this.UI_Message = "User created. Redirecting...";
        this.UI_Message_state = "SUCCESS";
        setTimeout(() => this.login(), 1500);
      },
      error: err => {
        console.log(err);
        this.UI_Message = "Error : Couldn't create the user";
        this.UI_Message_state = "ERROR";
      }
    });
  }
  

  logout() : void {
    this.auth.logout();
  }
}