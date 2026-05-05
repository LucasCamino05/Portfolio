import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Menu, X } from 'lucide-angular';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle';

/**
 * Controles del header: switcher de idioma + toggle de tema + burger
 * para abrir/cerrar el menú móvil.
 */
@Component({
  selector: 'app-header-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TranslatePipe,
    IconButtonComponent,
    LanguageSwitcherComponent,
    ThemeToggleComponent,
  ],
  template: `
    <div class="header-controls">
      <app-language-switcher />
      <app-theme-toggle />

      <div class="header-controls__burger">
        <app-icon-button
          [icon]="burgerIcon()"
          [ariaLabel]="(mobileOpen() ? 'header.closeMenu' : 'header.openMenu') | translate"
          (clicked)="burgerClicked.emit()"
        />
      </div>
    </div>
  `,
  styleUrl: './header-controls.scss',
})
export class HeaderControlsComponent {
  readonly mobileOpen = input<boolean>(false);
  readonly burgerClicked = output<void>();

  protected readonly burgerIcon = computed(() => (this.mobileOpen() ? X : Menu));
}
