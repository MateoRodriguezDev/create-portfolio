import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Project } from '../../../interfaces/project.interface';
import { ProjectService } from '../../../services/project.service';
import { StorageService } from '../../../services/firebase.service';
import { ProfileService } from '../../../services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<Project>();
  _profileService = inject(ProfileService)

  private route = inject(ActivatedRoute);
  profileId = signal<string>(this.route.snapshot.params['profileId']);

  constructor() {
    effect(() => {
      const imgPath = this.project().imgURL;
      this._storageService.getImageUrl(imgPath).then((url) => this.imgUrl.set(url));
    });
  }

  editing = output<Project>();

  _projectService = inject(ProjectService);
  _storageService = inject(StorageService);

  imgUrl = signal<string>('');

  //Envío la información del proyecto que se esta por editar
  onEditing() {
    this.editing.emit(this.project());
  }

  deleteProject(id: number) {
    this._projectService.deleteProject(id).subscribe({
      next: () => {
        console.log('Proyecto eliminado correctamente');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  technologies = computed(() => this.project().technologies.map((t) => t.technology));
}
