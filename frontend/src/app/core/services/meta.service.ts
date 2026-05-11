import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';
import { findProjectBySlug } from '../../data/projects.data';
import { LanguageService } from './language.service';

const BASE_TITLE = 'Lucas Camino';

/**
 * Mantiene el {@code <title>} del documento sincronizado con la
 * ruta activa y el idioma seleccionado.
 *
 * Reglas:
 *  - "/"                       → "Lucas Camino — <hero.title>"
 *  - "/proyectos/:slug"        → "<projectTitle> — Lucas Camino"
 *  - rutas no encontradas      → "Lucas Camino"
 *
 * Se actualiza en dos casos: cambia la ruta o cambia el idioma.
 */
@Injectable({ providedIn: 'root' })
export class MetaService {
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);
  private readonly route = inject(ActivatedRoute);
  private readonly doc = inject(DOCUMENT);

  /** Slug del proyecto si la ruta actual es /proyectos/:slug, sino null. */
  private readonly projectSlug = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.extractProjectSlug())
    ),
    { initialValue: null as string | null }
  );

  start(): void {
    // Re-renderiza el título cuando cambia el idioma o la ruta.
    effect(() => {
      // Dependencias reactivas:
      this.language.lang();
      const slug = this.projectSlug();
      this.title.setTitle(this.computeTitle(slug));
    });
  }

  private extractProjectSlug(): string | null {
    let r = this.route.firstChild;
    while (r?.firstChild) r = r.firstChild;
    return r?.snapshot.paramMap.get('slug') ?? null;
  }

  private computeTitle(slug: string | null): string {
    if (slug) {
      const project = findProjectBySlug(slug);
      if (project) {
        const projectName = this.translate.instant(project.titleKey);
        return `${projectName} — ${BASE_TITLE}`;
      }
    }
    const tagline = this.translate.instant('hero.title');
    return `${BASE_TITLE} — ${tagline}`;
  }
}
