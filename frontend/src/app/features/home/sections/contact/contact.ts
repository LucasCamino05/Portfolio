import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionComponent } from '../../../../shared/components/section/section';
import { ContactChannelsComponent } from './contact-channels/contact-channels';
import { ContactFormComponent } from './contact-form/contact-form';

/**
 * Sección Contacto. Componente padre delgado: solo arma el layout
 * (título + columnas) y compone los hijos.
 */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SectionComponent,
    ContactChannelsComponent,
    ContactFormComponent,
  ],
  template: `
    <app-section
      id="contact"
      titleKey="contact.title"
      subtitleKey="contact.subtitle"
      eyebrow="06"
    >
      <div class="contact-layout">
        <app-contact-channels />
        <app-contact-form />
      </div>
    </app-section>
  `,
  styleUrl: './contact.scss',
})
export class ContactComponent {}
