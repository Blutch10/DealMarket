import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './modules/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './core/service/login.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    AuthService,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    FormControl
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private authService: AuthService) {
    this.authService.autoLoginWithCookies();
  }
}
