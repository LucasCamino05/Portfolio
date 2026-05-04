import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { ContactChannelsComponent } from './contact-channels/contact-channels';
import { ContactFormComponent } from './contact-form/contact-form';

/**
 * Sección Contacto. Componente padre delgado: solo arma el layout
 * (título + columnas) y compone los hijos.
 *
 *   - {@link ContactChannelsComponent}: lista de canales (mail, WA, etc.).
 *   - {@link ContactFormComponent}: formulario reactivo con envío al backend.
 */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RevealDirective,
    SectionTitleComponent,
    ContactChannelsComponent,
    ContactFormComponent,
  ],
  template: `
    <section id="contact" class="contact" appReveal>
      <div class="contact__inner">
        <app-section-title
          titleKey="contact.title"
          subtitleKey="contact.subtitle"
          eyebrow="06"
        />

        <div class="contact__layout">
          <app-contact-channels />
          <app-contact-form />
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact.scss',
})
export class ContactComponent {}
