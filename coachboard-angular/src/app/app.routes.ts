import { Routes } from '@angular/router';
import { Dashboard }     from './pages/dashboard/dashboard';
import { ClientsPage }   from './pages/clients/clients';
import { mealplan }      from './pages/meal-plan/meal-plan';
import { Progress }      from './pages/progress/progress';
import { ClientDetail}  from './pages/client-detail/client-detail';

export const routes: Routes = [
  { path: '',              component: Dashboard    },
  { path: 'clients',       component: ClientsPage  },
  { path: 'clients/:id',   component: ClientDetail },
  { path: 'meals',         component: mealplan     },
  { path: 'progress',      component: Progress     },
  { path: '**',            redirectTo: ''                   }
];