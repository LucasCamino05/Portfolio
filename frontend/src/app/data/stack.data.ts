import { StackCategory } from '../types/stack.types';

export const STACK: StackCategory[] = [
  {
    key: 'backend',
    items: [
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'Python' },
      { name: 'FastAPI' },
    ],
  },
  {
    key: 'frontend',
    items: [
      { name: 'Angular' },
      { name: 'TypeScript' },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
  },
  {
    key: 'mobile',
    items: [{ name: 'Kotlin' }, { name: 'Android Studio' }],
  },
  {
    key: 'databases',
    items: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'SQL Server' },
    ],
  },
  {
    key: 'tools',
    items: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'IntelliJ IDEA' },
      { name: 'VS Code' },
      { name: 'Postman' },
      { name: 'Docker' },
      { name: 'Swagger' },
    ],
  },
  {
    key: 'languages',
    items: [{ name: 'C' }],
  },
  {
    key: 'architecture',
    items: [
      { name: 'MVC' },
      { name: 'REST APIs' },
      { name: 'JPA / Hibernate' },
    ],
  },
];
