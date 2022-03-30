import { Component } from '@angular/core';
import { AuthService } from './core/service/login.service';
import { AuthTypes } from './infos/types/auth.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App';
  authStatus = AuthTypes.LOADING;

  constructor(private authService: AuthService) {
    authService.authStatus$.subscribe(value => {
      this.authStatus = value;
    });
  }
}
