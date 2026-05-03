import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'proyectos/:slug',
    loadComponent: () =>
      import('./features/project-detail/project-detail').then(
        (m) => m.ProjectDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
