import { Routes } from '@angular/router';
import { Logincomponent } from '../login/logincomponent/logincomponent';
import { Signupcomponent } from '../signup/signupcomponent/signupcomponent';

export const routes: Routes = [
  { path: 'login', component: Logincomponent },
  { path: 'signup', component: Signupcomponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
