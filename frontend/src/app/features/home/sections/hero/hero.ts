import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SITE } from '../../../../data/site.config';
import { HeroDecorationComponent } from './hero-decoration/hero-decoration';

/**
 * Sección Hero. Compone:
 *  - {@link HeroDecorationComponent}: dot grid + aurora.
 *  - Bloque de texto (eyebrow, name, title, subtitle).
 *  - Foto/placeholder con iniciales sobre gradient violeta.
 */
@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, HeroDecorationComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  protected readonly site = SITE;
}
