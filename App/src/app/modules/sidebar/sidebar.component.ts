import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  constructor(private router: Router, private auth: AuthService) {}


  clickDashboard() : void {
    this.router.navigate(['/dashboard']);
  }


  clickTrading() : void {
    this.router.navigate(['/trading']);
  }


  clickLogout() : void {
    this.auth.logout();
    this.router.navigate(['']);
  }
  
}
