import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-user-projects',
  imports: [ProjectCard],
  templateUrl: './user-projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProjects { }
