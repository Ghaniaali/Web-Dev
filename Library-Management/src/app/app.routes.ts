import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Logincomponent } from '../login/logincomponent/logincomponent';
import { Signupcomponent } from '../signup/signupcomponent/signupcomponent';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AuthGuard } from './guard/auth.guard/auth.guard';
import { LoginGuard } from './guard/login.guard/login.guard';
import { RolesComponent } from './pages/roles/roles';
import { Books } from './pages/books/books';
import { Users } from './pages/users/users';
import { Reports } from './pages/reports/reports';

export const routes: Routes = [
  { 
    path: 'login', 
    component: Logincomponent, 
    canActivate: [LoginGuard] 
  },
  { 
    path: 'signup', 
    component: Signupcomponent, 
    canActivate: [LoginGuard] 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'roles', 
    component: RolesComponent, 
    canActivate: [AuthGuard] 
  },
  {
   path: 'books',
   component: Books,
   canActivate: [AuthGuard]
  },
  {
   path: 'users',
   component: Users,
   canActivate: [AuthGuard]
  },
  {
   path: 'reports',
   component: Reports,
   canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  {
    path: '**',
    redirectTo: '/dashboard' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}