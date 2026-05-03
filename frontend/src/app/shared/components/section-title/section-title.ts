import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Encabezado consistente para todas las secciones del Home.
 * Recibe `titleKey` y `subtitleKey` (i18n) como inputs.
 */
@Component({
  selector: 'app-section-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  template: `
    <header class="section-title">
      @if (eyebrow()) {
        <span class="section-title__eyebrow">{{ eyebrow() }}</span>
      }
      <h2 class="section-title__heading">{{ titleKey() | translate }}</h2>
      @if (subtitleKey()) {
        <p class="section-title__subtitle">{{ subtitleKey()! | translate }}</p>
      }
    </header>
  `,
  styleUrl: './section-title.scss',
})
export class SectionTitleComponent {
  readonly titleKey = input.required<string>();
  readonly subtitleKey = input<string | undefined>(undefined);
  /** Marcador opcional sobre el título (ej: "01 ·"). */
  readonly eyebrow = input<string | undefined>(undefined);
}
