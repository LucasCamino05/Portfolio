import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { ExperienceEntry } from '../../../../../types/experience.types';
import { resolveIcon } from '../../../../../shared/utils/icon-resolver';

const TEACHING_SUBJECTS = ['math', 'prog3', 'db2', 'soArch'] as const;

/**
 * Renderiza una entrada del timeline de experiencia.
 *
 * Maneja casos especiales por `entry.key`:
 *  - `'antares'`: muestra el bloque de progresión (cocinero → bartender → manager).
 *  - `'teaching'`: lista las materias (Matemática, Programación III, etc.).
 */
@Component({
  selector: 'app-experience-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './experience-entry.html',
  styleUrl: './experience-entry.scss',
})
export class ExperienceEntryComponent {
  readonly entry = input.required<ExperienceEntry>();

  protected readonly resolveIcon = resolveIcon;
  protected readonly teachingSubjects = TEACHING_SUBJECTS;
}
