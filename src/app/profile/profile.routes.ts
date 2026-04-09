import { Routes } from '@angular/router';
import { ProfileLayout } from './layout/profile-layout/profile-layout';
import { ProfilePage } from './pages/profile-page/profile-page';
import { NotFoundPage } from '../shared/pages/not-found-page/not-found-page';
import { ProfileRedirectGuard } from './guards/profileRedirect.guard';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileLayout,
    children: [
      {
        path: '',
        canActivate: [ProfileRedirectGuard],
        component: ProfilePage,
      },

      {
        path: 'notFound',
        component: NotFoundPage,
      },

      {
        path: ':profileId',
        component: ProfilePage,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

export default profileRoutes;
