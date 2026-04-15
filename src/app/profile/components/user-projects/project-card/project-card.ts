import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { Project } from '../../../interfaces/project.interface';
import { ProjectService } from '../../../services/project.service';
import { StorageService } from '../../../services/firebase.service';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { TechnologyElement } from '../../../interfaces/technologies.interface';
import { TechnologyService } from '../../../services/technology.service';
import { FullArtModal } from './full-art-modal/full-art-modal';

@Component({
  selector: 'app-project-card',
  imports: [FullArtModal],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<Project>();
  editing = output<Project>();

  displayArtModal = signal<boolean>(false);

  _profileService = inject(ProfileService);
  _projectService = inject(ProjectService);
  _storageService = inject(StorageService);
  _techService = inject(TechnologyService);
  private route = inject(ActivatedRoute);

  profileId = signal<string>(this.route.snapshot.params['profileId']);
  imgUrl = signal<string>('');
  technologies = computed(() => this.project().technologies.map((t) => t.technology));

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

  //Envío la información del proyecto que se esta por editar
  onEditing() {
    this.editing.emit(this.project());
  }

  closeModal() {
    this.displayArtModal.set(false);
  }

  openModal() {
    this.displayArtModal.set(true);
  }

  deleteProject(id: number) {
    this._projectService.deleteProject(id).subscribe({
      next: () => {
        console.log('Proyecto eliminado correctamente');
        this._techService.removeTotalTechs(this.project().technologies);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
