/**
 * Tipos del dominio "Project". Vivieron en data/projects.data.ts
 * pero salen acá para mantener data/ con solo datos y separar
 * "qué forma tiene" de "qué valores tiene".
 */

export type ProjectStatus = 'in-progress' | 'completed';

export interface ProjectLink {
  /** Clave i18n para el label, p.ej. "projects.viewCode". */
  labelKey: string;
  url: string;
  /** Si true, no se renderiza como link clickeable (texto informativo). */
  disabled?: boolean;
  /** Lucide icon name. */
  icon?: string;
}

export interface ProjectHighlight {
  /** Clave i18n del highlight. */
  key: string;
}

export interface Project {
  slug: string;
  /** Clave i18n del título corto. */
  titleKey: string;
  /** Clave i18n para tagline corta de la card. */
  taglineKey: string;
  /** Clave i18n para tagline larga del detalle (con siglas desplegadas). */
  taglineLongKey: string;
  /** Clave i18n del párrafo de motivación / contexto del detalle. */
  motivationKey?: string;
  status: ProjectStatus;
  stack: string[];
  highlights: ProjectHighlight[];
  /** Clave i18n del bloque "mi rol". */
  roleKey: string;
  /** Clave i18n del estado actual (texto narrativo). */
  currentStateKey?: string;
  /** Imagen principal en assets/images/projects/<slug>.png. */
  cover?: string;
  links: ProjectLink[];
  /** Si es co-autoría — clave i18n para describir el acuerdo. */
  coAuthorKey?: string;
}
