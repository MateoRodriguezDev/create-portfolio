import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UserProfileResponse } from '../../interfaces/userProfile.interface';

@Component({
  selector: 'app-user-info-bar',
  imports: [],
  templateUrl: './user-info-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoBar {

  profile = input.required<UserProfileResponse>()

}
