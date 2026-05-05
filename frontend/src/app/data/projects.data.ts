import { Project } from '../types/project.types';

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
