import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IBasicResponse } from 'src/app/interfaces/basic_response';

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
export class AuthComponent implements OnInit {
  
  username = new FormControl('');
  firstname = new FormControl('');
  lastname = new FormControl('');
  email = new FormControl('');
  
  name = new FormControl('');
  password = new FormControl('');
  showPassword: boolean = false;

  authType: 'REGISTER' | 'LOGIN' = 'LOGIN';

  
  constructor(private auth : AuthService) { }


  ngOnInit(): void {
  }


  changeVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  changeGoal(): void {
    this.authType= (this.authType === 'LOGIN') ? 'REGISTER' : 'LOGIN';
  }


  login() {
    //this.auth.login();
  }

  logout() : void {
    this.auth.logout();
  }
}