import { Routes } from '@angular/router';
import { NoAuthGuard } from './auth/guards/noAuth.guard';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [



    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes'),
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
        canActivate: [NoAuthGuard]
    },
    {
      path: '**',
      redirectTo: 'profile'
    }

];
