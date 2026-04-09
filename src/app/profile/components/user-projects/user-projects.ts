import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { ProjectCard } from './project-card/project-card';
import { CreateProjectModal } from './create-project-modal/create-project-modal';
import { Project } from '../../interfaces/project.interface';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-projects',
  imports: [ProjectCard, CreateProjectModal],
  templateUrl: './user-projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjects {
  _projectService = inject(ProjectService);
  _profileService = inject(ProfileService);

  private route = inject(ActivatedRoute);

  profileId = signal<string>(this.route.snapshot.params['profileId']);
  projects = computed(() => this._projectService.projects());
  editingProject = signal<Project | undefined>(undefined);

  isModalOpen = signal(false);

  setEditingProject(project: Project) {
    this.editingProject.set(project);
    this.openModal();
  }

  openModal() {
    this.isModalOpen.set(true);
  }
  closeModal() {
    this.editingProject.set(undefined);
    this.isModalOpen.set(false);
  }
}
