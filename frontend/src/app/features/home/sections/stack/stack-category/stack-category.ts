import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TechChipComponent } from '../../../../../shared/components/tech-chip/tech-chip';
import { StackCategory } from '../../../../../types/stack.types';

/**
 * Renderiza una categoría del stack: nombre + chips de tecnologías.
 */
@Component({
  selector: 'app-stack-category',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, TechChipComponent],
  template: `
    <div class="stack-category">
      <h3 class="stack-category__name">
        {{ 'stack.categories.' + category().key | translate }}
      </h3>
      <ul class="stack-category__chips">
        @for (item of category().items; track item.name) {
          <li><app-tech-chip [label]="item.name" /></li>
        }
      </ul>
    </div>
  `,
  styleUrl: './stack-category.scss',
})
export class StackCategoryComponent {
  readonly category = input.required<StackCategory>();
}
