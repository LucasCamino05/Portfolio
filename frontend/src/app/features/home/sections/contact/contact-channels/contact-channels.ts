import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Download, Github, Linkedin, LucideAngularModule, Mail, MessageCircle } from 'lucide-angular';
import { SITE } from '../../../../../data/site.config';

/**
 * Lista de canales de contacto (email, WhatsApp, LinkedIn, GitHub, descargar CV).
 *
 * Componente puro de presentación: no maneja estado ni efectos. Los datos
 * vienen del SITE config (single source of truth) y los íconos de Lucide.
 *
 * Decisión de privacidad: el número de WhatsApp NUNCA aparece como texto.
 * Solo se renderiza el handle "@LucasCamino"; el href contiene el número
 * pero no es visible para scrapers casuales.
 */
@Component({
  selector: 'app-contact-channels',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './contact-channels.html',
  styleUrl: './contact-channels.scss',
})
export class ContactChannelsComponent {
  protected readonly site = SITE;

  protected readonly MailIcon = Mail;
  protected readonly LinkedinIcon = Linkedin;
  protected readonly GithubIcon = Github;
  protected readonly WhatsappIcon = MessageCircle;
  protected readonly DownloadIcon = Download;
}
