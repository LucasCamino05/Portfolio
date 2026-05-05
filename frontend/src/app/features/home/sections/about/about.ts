import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionComponent } from '../../../../shared/components/section/section';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, SectionComponent],
  template: `
    <app-section id="about" titleKey="about.title" eyebrow="01">
      <div class="about-body">
        <p>{{ 'about.p1' | translate }}</p>
        <p>{{ 'about.p2' | translate }}</p>
        <p>{{ 'about.p3' | translate }}</p>
      </div>
    </app-section>
  `,
  styleUrl: './about.scss',
})
export class AboutComponent {}
