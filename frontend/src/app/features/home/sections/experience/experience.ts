import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  Beer,
  BookOpen,
  GraduationCap,
  LucideAngularModule,
  type LucideIconData,
} from 'lucide-angular';
import { COMPLEMENTARY, EXPERIENCE } from '../../../../data/experience.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';

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

  protected readonly iconMap: Record<string, LucideIconData> = {
    'graduation-cap': GraduationCap,
    'book-open': BookOpen,
    'beer': Beer,
  };

  /** Subjects breakdown — se renderizan dentro de la entry "teaching". */
  protected readonly teachingSubjects = ['math', 'prog3', 'db2', 'soArch'];

  protected resolveIcon(name: string): LucideIconData {
    return this.iconMap[name] ?? GraduationCap;
  }
}
