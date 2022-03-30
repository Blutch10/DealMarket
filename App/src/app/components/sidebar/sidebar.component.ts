import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  dashboardPageUrl = '/';

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  navigateToDashboard(): void {
    this.router.navigate([this.dashboardPageUrl]);
  }

}
