import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe, RevealDirective, SectionTitleComponent],
  template: `
    <section id="about" class="about" appReveal>
      <div class="about__inner">
        <app-section-title titleKey="about.title" eyebrow="01" />

        <div class="about__body">
          <p>{{ 'about.p1' | translate }}</p>
          <p>{{ 'about.p2' | translate }}</p>
          <p>{{ 'about.p3' | translate }}</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './about.scss',
})
export class AboutComponent {}
