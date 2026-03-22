import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-info-bar',
  imports: [],
  templateUrl: './user-info-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoBar { }
