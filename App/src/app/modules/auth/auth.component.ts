import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from './auth.login.service';
import { RegisterService } from './auth.register.service';

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
export class AuthComponent {
  
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

  
  constructor(private auth : AuthService, private reg : RegisterService) { }


  changeVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  changeGoal(): void {
    this.authType= (this.authType === 'LOGIN') ? 'REGISTER' : 'LOGIN';
  }


  submitButtonFunc() : void {
    if (this.authType === 'REGISTER')
      this.register();
    if (this.authType === 'LOGIN')
      this.login()
  }


  login() : void {
    this.auth.login(this.username_, this.password_);
  }


  register() : void {
    this.reg.register(this.username_, this.lastname_, this.firstname_, this.email_, this.password_);
  }
  

  logout() : void {
    this.auth.logout();
  }
}