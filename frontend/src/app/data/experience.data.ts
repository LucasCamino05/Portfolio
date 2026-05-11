import { ComplementaryCourseGroup, ExperienceEntry } from '../types/experience.types';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    key: 'tup',
    icon: 'graduation-cap',
    period: '2024 — Presente',
    present: true,
  },
  {
    key: 'teaching',
    icon: 'book-open',
    period: '2025 — Presente',
    present: true,
  },
  {
    key: 'antares',
    icon: 'beer',
    period: '2022 — Presente',
    present: true,
  },
];

export const COMPLEMENTARY: ComplementaryCourseGroup[] = [
  {
    provider: 'CoderHouse',
    courses: ['Desarrollo Web (2021)', 'JavaScript (2021)', 'React.js (2022)'],
  },
  {
    provider: 'IEEE ITBA',
    courses: ['Introducción a Python', 'Análisis de Datos en Python'],
  },
  {
    provider: 'Google · Grasshopper',
    courses: ['Fundamentos 1 y 2', 'Introducción a las entrevistas'],
  },
  {
    provider: 'Educación IT',
    courses: ['Python para no programadores'],
  },
  {
    provider: 'Sololearn',
    courses: ['C# (introducción)', 'SQL (introducción)'],
  },
  {
    provider: 'Udemy',
    courses: ['JavaScript', 'Lógica de Programación', 'SQL', 'Python'],
  },
];
