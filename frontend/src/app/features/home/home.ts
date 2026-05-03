import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { AboutComponent } from './sections/about/about';
import { ContactComponent } from './sections/contact/contact';
import { ExperienceComponent } from './sections/experience/experience';
import { HeroComponent } from './sections/hero/hero';
import { ProjectsComponent } from './sections/projects/projects';
import { SoftSkillsComponent } from './sections/soft-skills/soft-skills';
import { StackComponent } from './sections/stack/stack';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    AboutComponent,
    SoftSkillsComponent,
    StackComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
  ],
  template: `
    <main id="main">
      <app-hero />
      <app-about />
      <app-soft-skills />
      <app-stack />
      <app-projects />
      <app-experience />
      <app-contact />
    </main>
  `,
})
export class HomeComponent implements OnInit {
  private readonly contact = inject(ContactService);

  ngOnInit(): void {
    // Despertar el backend silenciosamente para mitigar cold start de Render.
    // Cuando el visitante llegue al formulario, el contenedor ya estará caliente.
    this.contact.warmUp().subscribe({
      next: () => {},
      error: () => {
        // Silenciamos: si el backend está caído, el form lo manejará al enviar.
      },
    });
  }
}
