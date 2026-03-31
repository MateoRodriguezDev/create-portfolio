import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Link } from '../../interfaces/userProfile.interface';

@Component({
  selector: 'app-user-links-techs',
  imports: [],
  templateUrl: './user-links-techs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLinksTechs {

  links = input.required<Link[]>()

}
