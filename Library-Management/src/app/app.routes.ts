import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Logincomponent } from '../login/logincomponent/logincomponent';
import { Signupcomponent } from '../signup/signupcomponent/signupcomponent';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AuthGuard } from './guard/auth.guard/auth.guard';
import { LoginGuard } from './guard/login.guard/login.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: Logincomponent, 
    canActivate: [LoginGuard] // Prevents access when already logged in
  },
  { 
    path: 'signup', 
    component: Signupcomponent, 
    canActivate: [LoginGuard] // Prevents access when already logged in
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] // Requires authentication
  },
  { 
    path: '', 
    redirectTo: '/dashboard', // Changed from '/login' to '/dashboard'
    pathMatch: 'full' 
  },
  {
    path: '**',
    redirectTo: '/dashboard' // Redirect any unknown routes to dashboard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}