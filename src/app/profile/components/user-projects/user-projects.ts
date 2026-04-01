import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ProjectCard } from './project-card/project-card';
import { CreateProjectModal } from "./create-project-modal/create-project-modal";
import { Project } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-user-projects',
  imports: [ProjectCard, CreateProjectModal],
  templateUrl: './user-projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjects {

  _projectService = inject(ProjectService)

  projects = computed(() => this._projectService.projects())

  isModalOpen = signal(false);

  openModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.isModalOpen.set(false);
  }
}
