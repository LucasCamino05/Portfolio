import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, type LucideIconData } from 'lucide-angular';

/**
 * Link cuadrado pequeño con un solo ícono — pensado para redes
 * sociales del footer. Misma forma que IconButton pero usando un
 * `<a>` (con target/rel correctos) en lugar de un `<button>`.
 */
@Component({
  selector: 'app-social-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <a
      class="social-link"
      [href]="href()"
      [attr.aria-label]="ariaLabel()"
      [attr.target]="external() ? '_blank' : null"
      [attr.rel]="external() ? 'noopener' : null"
    >
      <lucide-icon [img]="icon()" [size]="size()" />
    </a>
  `,
  styleUrl: './social-link.scss',
})
export class SocialLinkComponent {
  readonly icon = input.required<LucideIconData>();
  readonly href = input.required<string>();
  readonly ariaLabel = input.required<string>();
  readonly size = input<number>(18);
  /** Si true, abre en pestaña nueva con rel=noopener. Default true. */
  readonly external = input<boolean>(true);
}
