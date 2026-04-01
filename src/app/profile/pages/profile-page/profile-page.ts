import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { UserInfoBar } from '../../components/user-info-bar/user-info-bar';
import { UserLinksTechs } from '../../components/user-links-techs/user-links-techs';
import { UserProjects } from '../../components/user-projects/user-projects';
import { ProfileService } from '../../services/profile.service';
import { firstValueFrom } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-profile-page',
  imports: [UserInfoBar, UserLinksTechs, UserProjects],
  templateUrl: './profile-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {

_profileService = inject(ProfileService);

profileResource = resource({
    loader: () => firstValueFrom(this._profileService.getUserProfile()),
  });



}
