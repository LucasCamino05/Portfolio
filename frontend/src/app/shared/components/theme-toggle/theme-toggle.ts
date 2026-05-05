import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Moon, Sun } from 'lucide-angular';
import { ThemeService } from '../../../core/services/theme.service';
import { IconButtonComponent } from '../icon-button/icon-button';

/**
 * Toggle de tema light/dark. Es un wrapper delgado sobre IconButton:
 * decide qué ícono mostrar según el tema actual y delega el click
 * al ThemeService.
 *
 * El `aria-label` se traduce en el template con TranslatePipe para que
 * cambie automáticamente cuando se cambia el idioma.
 */
@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconButtonComponent, TranslatePipe],
  template: `
    <app-icon-button
      [icon]="iconForTheme()"
      [ariaLabel]="('header.toggleTheme' | translate)"
      [rotateOnHover]="true"
      (clicked)="theme.toggle()"
    />
  `,
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);

  protected readonly iconForTheme = computed(() =>
    this.theme.isDark() ? Sun : Moon
  );
}
