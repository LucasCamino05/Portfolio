import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { STACK } from '../../../../data/stack.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RevealDirective, SectionTitleComponent],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class StackComponent {
  protected readonly stack = STACK;
}
