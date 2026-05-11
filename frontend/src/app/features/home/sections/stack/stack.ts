import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STACK } from '../../../../data/stack.data';
import { SectionComponent } from '../../../../shared/components/section/section';
import { StackCategoryComponent } from './stack-category/stack-category';

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionComponent, StackCategoryComponent],
  template: `
    <app-section
      id="stack"
      titleKey="stack.title"
      subtitleKey="stack.subtitle"
      eyebrow="03"
      variant="surface"
    >
      <div class="stack-grid">
        @for (cat of stack; track cat.key) {
          <app-stack-category [category]="cat" />
        }
      </div>
    </app-section>
  `,
  styleUrl: './stack.scss',
})
export class StackComponent {
  protected readonly stack = STACK;
}
