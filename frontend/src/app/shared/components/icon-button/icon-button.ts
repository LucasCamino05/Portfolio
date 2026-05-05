import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Botón cuadrado pequeño con un solo ícono — formato consistente
 * para acciones de chrome (toggles, controles del header/footer).
 *
 * Diseño compartido por theme-toggle, language-switcher y los social
 * links del footer. Centraliza el estilo (border, rounded-full, hover
 * violeta) en un solo lugar.
 *
 * Si necesitás un link en lugar de un botón, usá <app-social-link>.
 */
@Component({
  selector: 'app-icon-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <button
      type="button"
      class="icon-button"
      [class.icon-button--rotate-on-hover]="rotateOnHover()"
      [attr.aria-label]="ariaLabel()"
      [attr.title]="ariaLabel()"
      (click)="clicked.emit()"
    >
      @if (icon()) {
        <lucide-icon [img]="icon()!" [size]="size()" />
      } @else {
        <ng-content />
      }
    </button>
  `,
  styleUrl: './icon-button.scss',
})
export class IconButtonComponent {
  readonly icon = input<LucideIconData | undefined>(undefined);
  readonly size = input<number>(18);
  readonly ariaLabel = input.required<string>();
  /** Aplica una sutil rotación al hover (estilo theme-toggle). */
  readonly rotateOnHover = input<boolean>(false);

  readonly clicked = output<void>();
}
