import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

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
      <span class="lang-switcher__current">{{ language.lang().toUpperCase() }}</span>
      <span class="lang-switcher__alt">/{{ alt().toUpperCase() }}</span>
    </button>
  `,
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcherComponent {
  protected readonly language = inject(LanguageService);

  protected alt = () => (this.language.lang() === 'es' ? 'en' : 'es');
}
