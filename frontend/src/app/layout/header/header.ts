import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';

interface NavLink {
  fragment: string;
  labelKey: string;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, RouterLink, TranslatePipe, ThemeToggleComponent, LanguageSwitcherComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  protected readonly MenuIcon = Menu;
  protected readonly XIcon = X;

  protected readonly mobileOpen = signal(false);

  protected readonly links: NavLink[] = [
    { fragment: 'about',      labelKey: 'nav.about' },
    { fragment: 'skills',     labelKey: 'nav.skills' },
    { fragment: 'stack',      labelKey: 'nav.stack' },
    { fragment: 'projects',   labelKey: 'nav.projects' },
    { fragment: 'experience', labelKey: 'nav.experience' },
    { fragment: 'contact',    labelKey: 'nav.contact' },
  ];

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  protected closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
