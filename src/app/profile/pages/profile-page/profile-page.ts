import { ChangeDetectionStrategy, Component, inject, OnInit, resource, signal } from '@angular/core';
import { UserInfoBar } from '../../components/user-info-bar/user-info-bar';
import { UserLinksTechs } from '../../components/user-links-techs/user-links-techs';
import { UserProjects } from '../../components/user-projects/user-projects';
import { ProfileService } from '../../services/profile.service';
import { firstValueFrom, map, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-page',
  imports: [UserInfoBar, UserLinksTechs, UserProjects],
  templateUrl: './profile-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage{



_profileService = inject(ProfileService);
_authService = inject(AuthService)

route = inject(ActivatedRoute);
router = inject(Router)


profileId = toSignal(
  this.route.params.pipe(map(params => params['profileId']))
);




profileResource = resource({
  params: () => this.profileId(),  // 👈 reacciona cuando profileId cambia
  loader: ({ params: profileId }) =>
    firstValueFrom(this._profileService.getUserProfile(+profileId))
});



}
