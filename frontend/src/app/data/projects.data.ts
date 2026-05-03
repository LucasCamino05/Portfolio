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
  /** Clave i18n del highlight (será definida por proyecto). */
  key: string;
}

export interface Project {
  slug: string;
  /** Clave i18n del título corto. Resolvió a string vía translate pipe. */
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

export const PROJECTS: Project[] = [
  {
    slug: 'loki',
    titleKey: 'projectsData.loki.title',
    taglineKey: 'projectsData.loki.tagline',
    taglineLongKey: 'projectsData.loki.taglineLong',
    motivationKey: 'projectsData.loki.motivation',
    status: 'in-progress',
    stack: [
      'Angular 20',
      'Signals',
      'PrimeNG',
      'Swiper',
      'JSON Server',
      'Spring Boot',
      'Java 25',
      'PostgreSQL',
      'Docker',
    ],
    highlights: [
      { key: 'projectsData.loki.highlights.realtime' },
      { key: 'projectsData.loki.highlights.reactiveForms' },
      { key: 'projectsData.loki.highlights.crud' },
      { key: 'projectsData.loki.highlights.docker' },
    ],
    roleKey: 'projectsData.loki.role',
    currentStateKey: 'projectsData.loki.currentState',
    coAuthorKey: 'projectsData.loki.coAuthor',
    cover: 'assets/images/projects/loki.png',
    links: [
      {
        labelKey: 'projectsData.loki.links.frontend',
        url: 'https://github.com/LucasCamino05/loki',
        icon: 'github',
      },
      {
        labelKey: 'projectsData.loki.links.backend',
        url: 'https://github.com/diemaidana/project-loki',
        icon: 'github',
      },
    ],
  },
  {
    slug: 'bonvoyage',
    titleKey: 'projectsData.bonvoyage.title',
    taglineKey: 'projectsData.bonvoyage.tagline',
    taglineLongKey: 'projectsData.bonvoyage.taglineLong',
    status: 'completed',
    stack: ['Java', 'JavaFX', 'JSON', 'Maven', 'MVC'],
    highlights: [
      { key: 'projectsData.bonvoyage.highlights.javafx' },
      { key: 'projectsData.bonvoyage.highlights.json' },
      { key: 'projectsData.bonvoyage.highlights.mvc' },
      { key: 'projectsData.bonvoyage.highlights.poo' },
      { key: 'projectsData.bonvoyage.highlights.luhn' },
    ],
    roleKey: 'projectsData.bonvoyage.role',
    coAuthorKey: 'projectsData.bonvoyage.coAuthor',
    cover: 'assets/images/projects/bonvoyage.png',
    links: [
      {
        labelKey: 'projects.viewCode',
        url: 'https://github.com/LucasCamino05/BonVoyageApp',
        icon: 'github',
      },
    ],
  },
  {
    slug: 'mis-finanzas',
    titleKey: 'projectsData.misfinanzas.title',
    taglineKey: 'projectsData.misfinanzas.tagline',
    taglineLongKey: 'projectsData.misfinanzas.taglineLong',
    motivationKey: 'projectsData.misfinanzas.motivation',
    status: 'in-progress',
    stack: [
      'Kotlin 2.3',
      'Kotlin Multiplatform',
      'Jetpack Compose',
      'Material 3',
      'SQLDelight',
      'Supabase',
      'Ktor',
      'Koin',
      'Clean Architecture',
      'MVVM',
    ],
    highlights: [
      { key: 'projectsData.misfinanzas.highlights.offline' },
      { key: 'projectsData.misfinanzas.highlights.cloud' },
      { key: 'projectsData.misfinanzas.highlights.auth' },
      { key: 'projectsData.misfinanzas.highlights.persistence' },
      { key: 'projectsData.misfinanzas.highlights.architecture' },
      { key: 'projectsData.misfinanzas.highlights.compose' },
    ],
    roleKey: 'projectsData.misfinanzas.role',
    currentStateKey: 'projectsData.misfinanzas.currentState',
    cover: 'assets/images/projects/mis-finanzas.png',
    links: [
      {
        labelKey: 'projects.privateRepo',
        url: '#',
        disabled: true,
        icon: 'lock',
      },
    ],
  },
];

export function findProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
