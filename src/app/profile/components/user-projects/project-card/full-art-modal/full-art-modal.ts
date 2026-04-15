import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { Project } from '../../../../interfaces/project.interface';
import { signInAnonymously } from '@angular/fire/auth';
import { StorageService } from '../../../../services/firebase.service';
import { ProfileService } from '../../../../services/profile.service';
import { ProjectService } from '../../../../services/project.service';
import { TechnologyService } from '../../../../services/technology.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-art-modal',
  imports: [],
  templateUrl: './full-art-modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullArtModal {
  _profileService = inject(ProfileService);
  _projectService = inject(ProjectService);
  _storageService = inject(StorageService);
  _techService = inject(TechnologyService);

  private route = inject(ActivatedRoute);
  profileId = signal<string>(this.route.snapshot.params['profileId']);

  project = input.required<Project>();
  close = output<void>();
  imgUrl = signal<string>('');

    constructor() {
    effect(() => {
      const imgPath = this.project().imgURL;
      this._storageService.getImageUrl(imgPath).then((url) => this.imgUrl.set(url));
    });

    effect(() => {
      const techs = this.project().technologies;
      if (techs.length > 0) {
        untracked(() => this._techService.updateTotalTechs(techs));
      }
    });
  }

  onClose() {
    this.close.emit();
  }
}
