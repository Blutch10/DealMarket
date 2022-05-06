import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { Dashboard } from './modules/dashboard/dashboard.component';
import { PersonComponent } from './modules/person/person.component';

const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: '', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}