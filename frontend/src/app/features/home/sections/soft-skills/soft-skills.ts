import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { SOFT_SKILLS } from '../../../../data/soft-skills.data';
import { SectionComponent } from '../../../../shared/components/section/section';
import { resolveIcon } from '../../../../shared/utils/icon-resolver';

@Component({
  selector: 'app-soft-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe, SectionComponent],
  templateUrl: './soft-skills.html',
  styleUrl: './soft-skills.scss',
})
export class SoftSkillsComponent {
  protected readonly skills = SOFT_SKILLS;
  protected readonly resolveIcon = resolveIcon;
}
