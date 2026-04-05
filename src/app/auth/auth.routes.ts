import { Routes } from '@angular/router';
import { NotFoundPage } from '../shared/pages/not-found-page/not-found-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

export const profileRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export default profileRoutes;
