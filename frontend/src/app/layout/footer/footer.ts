import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE } from '../../data/site.config';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';
import { FooterSocialComponent } from './footer-social/footer-social';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    ThemeToggleComponent,
    LanguageSwitcherComponent,
    FooterSocialComponent,
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();
}
