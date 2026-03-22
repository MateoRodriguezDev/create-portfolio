import { Routes } from '@angular/router';

export const routes: Routes = [



    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes')
    },

];
