import { Routes } from '@angular/router';
import { ProfileLayout } from './layout/profile-layout/profile-layout';
import { ProfilePage } from './pages/profile-page/profile-page';
import { NotFoundPage } from '../shared/pages/not-found-page/not-found-page';

export const profileRoutes: Routes = [

    {
        path: '',
        component: ProfileLayout,
        children: [

            {
                path: ':profileId',
                component: ProfilePage
            },
            {
                path: '**',
                component: NotFoundPage
            },


        ]
    },

    {
        path: '**',
        redirectTo: ''
    }

]





export default profileRoutes
