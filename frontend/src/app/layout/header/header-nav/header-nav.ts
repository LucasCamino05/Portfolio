import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

interface NavLink {
  fragment: string;
  labelKey: string;
}

/**
 * Lista de links del menú principal del header.
 * Acepta input `open` para mostrarse en mobile y emite `linkClicked`
 * para que el header padre cierre el menú al navegar.
 */
@Component({
  selector: 'app-header-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslatePipe],
  template: `
    <nav class="header-nav" [class.is-open]="open()" aria-label="Main">
      <ul class="header-nav__list">
        @for (link of links; track link.fragment) {
          <li>
            <a
              class="header-nav__link"
              routerLink="/"
              [fragment]="link.fragment"
              (click)="linkClicked.emit()"
            >
              {{ link.labelKey | translate }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './header-nav.scss',
})
export class HeaderNavComponent {
  readonly open = input<boolean>(false);
  readonly linkClicked = output<void>();

  protected readonly links: NavLink[] = [
    { fragment: 'about',      labelKey: 'nav.about' },
    { fragment: 'skills',     labelKey: 'nav.skills' },
    { fragment: 'stack',      labelKey: 'nav.stack' },
    { fragment: 'projects',   labelKey: 'nav.projects' },
    { fragment: 'experience', labelKey: 'nav.experience' },
    { fragment: 'contact',    labelKey: 'nav.contact' },
  ];
}
