import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { HeaderControlsComponent } from './header-controls/header-controls';
import { HeaderNavComponent } from './header-nav/header-nav';

/**
 * Header padre delgado: posicionamiento sticky + brand + composición
 * de los hijos. La lógica de cada zona vive en su propio componente.
 */
@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslatePipe, HeaderNavComponent, HeaderControlsComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  protected readonly mobileOpen = signal(false);

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
