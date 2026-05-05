import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { COMPLEMENTARY, EXPERIENCE } from '../../../../data/experience.data';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { resolveIcon } from '../../../../shared/utils/icon-resolver';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe, RevealDirective, SectionTitleComponent],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  protected readonly entries = EXPERIENCE;
  protected readonly complementary = COMPLEMENTARY;
  protected readonly teachingSubjects = ['math', 'prog3', 'db2', 'soArch'];
  protected readonly resolveIcon = resolveIcon;
}
