/**
 * Tipos del dominio "Experience" — timeline + cursos complementarios.
 */

export interface ExperienceEntry {
  /** Clave única para mapear traducciones (experienceData.<key>...) */
  key: string;
  /** Lucide icon name. */
  icon: string;
  /** Período tal como se muestra. No se traduce (fechas son universales). */
  period: string;
  /** Si está activo (badge "Presente"). */
  present?: boolean;
}

export interface ComplementaryCourseGroup {
  provider: string;
  /** Lista plana de cursos (sin fechas — más legible). */
  courses: string[];
}
