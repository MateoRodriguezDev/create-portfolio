import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Project } from '../../../interfaces/project.interface';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<Project>()


  _projectService = inject(ProjectService);

  deleteProject(id: number) {
     this._projectService.deleteProject(id).subscribe({
    next: () => {
      console.log('Proyecto eliminado correctamente')
    },
    error: (err) => {
      console.error(err)
    }
  });
  }

  technologies = computed(() =>
    this.project().technologies.map(t => t.technology)
  );

}
