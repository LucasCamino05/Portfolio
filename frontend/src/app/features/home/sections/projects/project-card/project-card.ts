import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ArrowUpRight, Github, LucideAngularModule } from 'lucide-angular';
import { StatusBadgeComponent } from '../../../../../shared/components/status-badge/status-badge';
import { TechChipComponent } from '../../../../../shared/components/tech-chip/tech-chip';
import { Project } from '../../../../../types/project.types';

const MAX_VISIBLE_CHIPS = 5;

/**
 * Card de proyecto en el listing del Home.
 *
 * Muestra:
 *  - Cover con gradient y mark del slug.
 *  - Status badge (en desarrollo / finalizado).
 *  - Tagline corta.
 *  - Hasta MAX_VISIBLE_CHIPS chips de stack + indicador "+N" si hay más.
 *  - CTA "Ver más" (link al detalle) y links externos al repo.
 */
@Component({
  selector: 'app-project-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    RouterLink,
    TranslatePipe,
    StatusBadgeComponent,
    TechChipComponent,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();

  protected readonly ArrowUpRightIcon = ArrowUpRight;
  protected readonly GithubIcon = Github;

  protected readonly visibleChips = computed(() =>
    this.project().stack.slice(0, MAX_VISIBLE_CHIPS)
  );

  protected readonly extraChipsCount = computed(() =>
    Math.max(0, this.project().stack.length - MAX_VISIBLE_CHIPS)
  );

  protected readonly externalLinks = computed(() =>
    this.project().links.filter((l) => !l.disabled)
  );
}
