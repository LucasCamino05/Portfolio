import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { SectionTitleComponent } from '../section-title/section-title';

/**
 * Wrapper consistente para todas las secciones del Home.
 * Encapsula el `<section>` + `appReveal` + `<app-section-title>`.
 *
 * Beneficios:
 *  - Cada sección del Home se reduce a `<app-section ...>contenido</app-section>`.
 *  - Si en el futuro cambia el layout base (padding, animación de entrada,
 *    spacing del título), se modifica un solo lugar.
 *  - El contenido va por slot (`<ng-content>`).
 *
 * Uso:
 *   <app-section
 *     id="about"
 *     titleKey="about.title"
 *     subtitleKey="about.subtitle"
 *     eyebrow="01">
 *     <p>Mi contenido</p>
 *   </app-section>
 */
@Component({
  selector: 'app-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionTitleComponent],
  template: `
    <section [id]="id()" [class]="'section ' + (variant() ?? '')" appReveal>
      <div class="section__inner">
        <app-section-title
          [titleKey]="titleKey()"
          [subtitleKey]="subtitleKey()"
          [eyebrow]="eyebrow()"
        />
        <ng-content />
      </div>
    </section>
  `,
  styleUrl: './section.scss',
})
export class SectionComponent {
  /** Anchor para el menú de nav (#about, #stack, etc.). */
  readonly id = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly subtitleKey = input<string | undefined>(undefined);
  readonly eyebrow = input<string | undefined>(undefined);

  /**
   * Variante de fondo opcional:
   *   undefined → bg base
   *   'surface'  → fondo de surface (alterna con la sección anterior)
   */
  readonly variant = input<'surface' | undefined>(undefined);
}
