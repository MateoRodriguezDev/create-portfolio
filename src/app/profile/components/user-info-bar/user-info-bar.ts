import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { UserProfileResponse } from '../../interfaces/userProfile.interface';
import { StorageService } from '../../services/firebase.service';

@Component({
  selector: 'app-user-info-bar',
  imports: [],
  templateUrl: './user-info-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoBar {
  profile = input.required<UserProfileResponse>();

  _storageService = inject(StorageService);

  imgUrl = signal<string>('');

  ngOnInit() {
    this._storageService
      .getImageUrl(this.profile().profilePictureURL)
      .then((url) => this.imgUrl.set(url));
  }
}
