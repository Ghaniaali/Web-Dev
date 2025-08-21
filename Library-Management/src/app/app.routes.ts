import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Logincomponent } from '../login/logincomponent/logincomponent';
import { Signupcomponent } from '../signup/signupcomponent/signupcomponent';

export const routes: Routes = [
  { path: 'login', component: Logincomponent },
  { path: 'signup', component: Signupcomponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
