import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

/**
 * Switcher de idioma ES/EN. Visualmente NO es un IconButton (es un
 * botón con texto, no ícono), por eso no usa el wrapper compartido —
 * tiene su propio estilo "ES/en" mono-tipográfico.
 */
@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  template: `
    <button
      type="button"
      class="lang-switcher"
      [attr.aria-label]="'header.toggleLanguage' | translate"
      [attr.title]="'header.toggleLanguage' | translate"
      (click)="language.toggle()"
    >
      <span class="lang-switcher__current">{{ currentLabel() }}</span>
      <span class="lang-switcher__alt">/{{ altLabel() }}</span>
    </button>
  `,
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcherComponent {
  protected readonly language = inject(LanguageService);

  protected readonly currentLabel = computed(() =>
    this.language.lang().toUpperCase()
  );

  protected readonly altLabel = computed(() =>
    (this.language.lang() === 'es' ? 'en' : 'es').toUpperCase()
  );
}
