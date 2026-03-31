import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProjectCard } from './project-card/project-card';
import { Project } from '../../interfaces/userProfile.interface';

@Component({
  selector: 'app-user-projects',
  imports: [ProjectCard],
  templateUrl: './user-projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjects {

  projects = input.required<Project[]>()

}
