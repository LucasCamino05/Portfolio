import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProjectStatus } from '../../../types/project.types';

/**
 * Pill que muestra el estado de un proyecto: "En desarrollo" / "Finalizado".
 *
 * Centraliza el mapeo `status → key i18n` y el styling de cada variante.
 * Usado por la card del listing y el detalle del proyecto.
 *
 * El `variant` permite cambiar el contraste según el fondo:
 *  - `default` → fondo translúcido violeta sobre cualquier surface
 *  - `on-cover` → blanco translúcido sobre el cover gradient (Projects card)
 */
@Component({
  selector: 'app-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  template: `
    <span
      class="status-badge"
      [class.is-progress]="status() === 'in-progress'"
      [class.is-done]="status() === 'completed'"
      [class.is-on-cover]="variant() === 'on-cover'"
    >
      {{ labelKey() | translate }}
    </span>
  `,
  styleUrl: './status-badge.scss',
})
export class StatusBadgeComponent {
  readonly status = input.required<ProjectStatus>();
  readonly variant = input<'default' | 'on-cover'>('default');

  protected readonly labelKey = computed(() =>
    this.status() === 'in-progress'
      ? 'projects.status.inProgress'
      : 'projects.status.completed'
  );
}
