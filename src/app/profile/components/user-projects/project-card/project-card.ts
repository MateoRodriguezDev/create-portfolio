import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Project } from '../../../interfaces/userProfile.interface';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  project = input.required<Project>()

  technologies = computed(() =>
    this.project().technologies.map(t => t.technology)
  );

}
