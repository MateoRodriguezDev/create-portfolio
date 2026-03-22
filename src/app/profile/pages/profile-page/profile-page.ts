import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserInfoBar } from '../../components/user-info-bar/user-info-bar';

@Component({
  selector: 'app-profile-page',
  imports: [UserInfoBar],
  templateUrl: './profile-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage { }
