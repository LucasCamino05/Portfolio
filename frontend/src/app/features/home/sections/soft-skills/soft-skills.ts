import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  Flame,
  GraduationCap,
  LucideAngularModule,
  type LucideIconData,
  RefreshCw,
  Target,
  Users,
  Wrench,
} from 'lucide-angular';
import { SOFT_SKILLS } from '../../../../data/soft-skills.data';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';

@Component({
  selector: 'app-soft-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe, RevealDirective, SectionTitleComponent],
  templateUrl: './soft-skills.html',
  styleUrl: './soft-skills.scss',
})
export class SoftSkillsComponent {
  protected readonly skills = SOFT_SKILLS;

  // Mapa de íconos para resolverlos por nombre del data file
  protected readonly iconMap: Record<string, LucideIconData> = {
    'users': Users,
    'flame': Flame,
    'graduation-cap': GraduationCap,
    'refresh-cw': RefreshCw,
    'wrench': Wrench,
    'target': Target,
  };

  protected resolveIcon(name: string): LucideIconData {
    return this.iconMap[name] ?? Users;
  }
}
