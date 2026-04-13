import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { StorageService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet],
  templateUrl: './profile-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayout {
  _profileService = inject(ProfileService)
  _storageService = inject(StorageService)

  backgroundImage = computed(() =>
    this._profileService.backgroundURL()
  )
  imgUrl = signal('')

constructor() {
  effect(() => {
    const bg = this.backgroundImage();
    if (bg) {
      this._storageService
        .getImageUrl(bg)
        .then(url => this.imgUrl.set(url));
    }
  });
}


}
