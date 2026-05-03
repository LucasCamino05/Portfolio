import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ArrowUpRight, Github, LucideAngularModule } from 'lucide-angular';
import { PROJECTS, Project } from '../../../../data/projects.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    RouterLink,
    TranslatePipe,
    RevealDirective,
    SectionTitleComponent,
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  protected readonly projects: Project[] = PROJECTS;
  protected readonly ArrowUpRightIcon = ArrowUpRight;
  protected readonly GithubIcon = Github;

  protected statusKey(p: Project): string {
    return p.status === 'in-progress'
      ? 'projects.status.inProgress'
      : 'projects.status.completed';
  }
}
