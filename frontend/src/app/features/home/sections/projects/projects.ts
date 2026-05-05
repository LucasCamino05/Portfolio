import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../../../data/projects.data';
import { SectionComponent } from '../../../../shared/components/section/section';
import { ProjectCardComponent } from './project-card/project-card';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionComponent, ProjectCardComponent],
  template: `
    <app-section
      id="projects"
      titleKey="projects.title"
      subtitleKey="projects.subtitle"
      eyebrow="04"
    >
      <ul class="projects-grid">
        @for (project of projects; track project.slug) {
          <li><app-project-card [project]="project" /></li>
        }
      </ul>
    </app-section>
  `,
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
}
