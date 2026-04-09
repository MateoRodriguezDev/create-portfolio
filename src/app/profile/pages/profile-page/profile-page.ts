import { ChangeDetectionStrategy, Component, inject, OnInit, resource, signal } from '@angular/core';
import { UserInfoBar } from '../../components/user-info-bar/user-info-bar';
import { UserLinksTechs } from '../../components/user-links-techs/user-links-techs';
import { UserProjects } from '../../components/user-projects/user-projects';
import { ProfileService } from '../../services/profile.service';
import { firstValueFrom, tap } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [UserInfoBar, UserLinksTechs, UserProjects],
  templateUrl: './profile-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage{



_profileService = inject(ProfileService);
private route = inject(ActivatedRoute)
profileId = signal<string>(this.route.snapshot.params['profileId'])




profileResource = resource({
    loader: () => firstValueFrom(this._profileService.getUserProfile(+this.profileId()).pipe(
      tap(profile => console.log('Profile:', profile)))),
  });



}
