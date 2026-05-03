import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe],
  template: `
    <button
      type="button"
      class="theme-toggle"
      [attr.aria-label]="'header.toggleTheme' | translate"
      [attr.title]="'header.toggleTheme' | translate"
      (click)="theme.toggle()"
    >
      @if (theme.isDark()) {
        <lucide-icon [img]="SunIcon" [size]="18" />
      } @else {
        <lucide-icon [img]="MoonIcon" [size]="18" />
      }
    </button>
  `,
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggleComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly SunIcon = Sun;
  protected readonly MoonIcon = Moon;
}
