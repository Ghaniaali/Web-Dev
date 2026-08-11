import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Clients } from './pages/clients/clients';
import { MealPlan } from './pages/meal-plan/meal-plan';
import { Progress } from './pages/progress/progress';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'clients',
    component: Clients
  },

  {
    path: 'meal-plan',
    component: MealPlan
  },

  {
    path: 'progress',
    component: Progress
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
