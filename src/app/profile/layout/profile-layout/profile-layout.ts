import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { StorageService } from '../../services/firebase.service';
import { BackgroundGradientGenerator } from '../../../utils/backgroundGradientGenerator';

@Component({
  selector: 'app-profile-layout',
  imports: [RouterOutlet],
  templateUrl: './profile-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileLayout {
  _profileService = inject(ProfileService);
  _storageService = inject(StorageService);

  gradient = signal(new BackgroundGradientGenerator().generateRandomGradient());

  hasBackgroundIMG = signal<boolean>(false);

  backgroundImage = computed(() => this._profileService.backgroundURL());
  imgUrl = signal('');

  constructor() {
    effect(() => {
      console.log(this.gradient())
      const bg = this.backgroundImage();
      if (bg) {
        this.hasBackgroundIMG.set(true);

        this._storageService.getImageUrl(bg).then((url) => this.imgUrl.set(url));
      } else {
      }
    });
  }
}
