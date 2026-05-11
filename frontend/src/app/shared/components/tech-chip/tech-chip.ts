import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Chip mono-tipográfico que representa una tecnología.
 * Compartido por:
 *  - Stack section (chips de cada categoría)
 *  - Project card (slice de stack en el listing)
 *  - Project detail (stack completo)
 *
 * `variant` ajusta el estilo:
 *  - `outline` → borde + bg neutro (default; usado en Stack y ProjectDetail)
 *  - `solid`   → bg violeta soft (usado en ProjectCard, más compacto)
 */
@Component({
  selector: 'app-tech-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="tech-chip" [class.tech-chip--solid]="variant() === 'solid'">
      {{ label() }}
    </span>
  `,
  styleUrl: './tech-chip.scss',
})
export class TechChipComponent {
  readonly label = input.required<string>();
  readonly variant = input<'outline' | 'solid'>('outline');
}
