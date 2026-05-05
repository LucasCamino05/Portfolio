import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Lock,
  LucideAngularModule,
} from 'lucide-angular';
import { findProjectBySlug } from '../../data/projects.data';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { TechChipComponent } from '../../shared/components/tech-chip/tech-chip';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-project-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    RouterLink,
    TranslatePipe,
    RevealDirective,
    StatusBadgeComponent,
    TechChipComponent,
  ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly ArrowLeftIcon = ArrowLeft;
  protected readonly ExternalLinkIcon = ExternalLink;
  protected readonly GithubIcon = Github;
  protected readonly LockIcon = Lock;

  private readonly slug = toSignal(this.route.paramMap, { requireSync: true });

  protected readonly project = computed(() => {
    const slug = this.slug().get('slug') ?? '';
    return findProjectBySlug(slug);
  });
}
