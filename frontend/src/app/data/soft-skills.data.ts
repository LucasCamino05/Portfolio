/**
 * Las claves apuntan a `softSkills.items.<key>` en los JSON de i18n.
 * Los íconos usan nombres de Lucide.
 */
export interface SoftSkill {
  key:
    | 'leadership'
    | 'pressure'
    | 'teaching'
    | 'adaptability'
    | 'problemSolving'
    | 'commitment';
  icon: string;
}

export const SOFT_SKILLS: SoftSkill[] = [
  { key: 'leadership',     icon: 'users' },
  { key: 'pressure',       icon: 'flame' },
  { key: 'teaching',       icon: 'graduation-cap' },
  { key: 'adaptability',   icon: 'refresh-cw' },
  { key: 'problemSolving', icon: 'wrench' },
  { key: 'commitment',     icon: 'target' },
];
