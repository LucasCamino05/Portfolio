/**
 * Tipos del dominio "SoftSkill" — habilidades blandas del portfolio.
 */
export interface SoftSkill {
  /**
   * Clave única de la skill. Se usa para:
   *  - resolver textos i18n: `softSkills.items.<key>.title` y `.evidence`
   *  - identificar la entrada en data/.
   */
  key:
    | 'leadership'
    | 'pressure'
    | 'teaching'
    | 'adaptability'
    | 'problemSolving'
    | 'commitment';

  /** Nombre del ícono Lucide (resuelto por icon-resolver). */
  icon: string;
}
