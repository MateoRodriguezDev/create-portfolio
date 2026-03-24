import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserInfoBar } from '../../components/user-info-bar/user-info-bar';
import { UserLinksTechs } from '../../components/user-links-techs/user-links-techs';
import { UserProjects } from '../../components/user-projects/user-projects';

@Component({
  selector: 'app-profile-page',
  imports: [UserInfoBar, UserLinksTechs, UserProjects],
  templateUrl: './profile-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage { }
