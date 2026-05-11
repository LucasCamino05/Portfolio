import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { COMPLEMENTARY } from '../../../../../data/experience.data';

/**
 * Subsección "Formación complementaria" — lista compacta de cursos
 * agrupados por proveedor (CoderHouse, IEEE ITBA, Udemy, etc.).
 *
 * Sin íconos pesados — el peso visual lo lleva el timeline principal.
 */
@Component({
  selector: 'app-complementary-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  template: `
    <section class="complementary-list">
      <h3 class="complementary-list__title">
        {{ 'experience.complementary' | translate }}
      </h3>
      <ul class="complementary-list__items">
        @for (group of complementary; track group.provider) {
          <li>
            <strong>{{ group.provider }}</strong>
            <span>— {{ group.courses.join(', ') }}</span>
          </li>
        }
      </ul>
    </section>
  `,
  styleUrl: './complementary-list.scss',
})
export class ComplementaryListComponent {
  protected readonly complementary = COMPLEMENTARY;
}
