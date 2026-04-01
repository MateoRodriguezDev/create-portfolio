import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Project } from '../../../interfaces/project.interface';
import { ProjectService } from '../../../services/project.service';
import { StorageService } from '../../../services/firebase.service';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<Project>();

  _projectService = inject(ProjectService);
  _storageService = inject(StorageService);

  imgUrl = signal<string>('');

ngOnInit() {
  this._storageService.getImageUrl(this.project().imgURL)
    .then(url => this.imgUrl.set(url));
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
