import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { UserProfileResponse } from '../../interfaces/userProfile.interface';
import { StorageService } from '../../services/firebase.service';
import { EditProfileModal } from './edit-profile-modal/edit-profile-modal';
import { AuthService } from '../../../auth/services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info-bar',
  imports: [EditProfileModal],
  templateUrl: './user-info-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoBar {
  profile = input.required<UserProfileResponse>();

  profileUpdated = output<void>();

  _storageService = inject(StorageService);
  _profileService = inject(ProfileService);
  _authService = inject(AuthService);

  profileId = computed(() => this.profile().id)

  isModalOpen = signal(false);
  imgUrl = signal<string>('');

  openModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }

  ngOnInit() {
    this._storageService
      .getImageUrl(this.profile().profilePictureURL)
      .then((url) => this.imgUrl.set(url));
  }

  signOut() {
    this._authService.logout();
  }
}
