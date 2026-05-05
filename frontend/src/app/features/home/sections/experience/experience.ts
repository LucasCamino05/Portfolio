import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCE } from '../../../../data/experience.data';
import { SectionComponent } from '../../../../shared/components/section/section';
import { ComplementaryListComponent } from './complementary-list/complementary-list';
import { ExperienceEntryComponent } from './experience-entry/experience-entry';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionComponent,
    ExperienceEntryComponent,
    ComplementaryListComponent,
  ],
  template: `
    <app-section
      id="experience"
      titleKey="experience.title"
      subtitleKey="experience.subtitle"
      eyebrow="05"
      variant="surface"
    >
      <ol class="experience-timeline">
        @for (entry of entries; track entry.key) {
          <app-experience-entry [entry]="entry" />
        }
      </ol>

      <app-complementary-list />
    </app-section>
  `,
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  protected readonly entries = EXPERIENCE;
}
