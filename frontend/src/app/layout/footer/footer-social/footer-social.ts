import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-angular';
import { SITE } from '../../../data/site.config';
import { SocialLinkComponent } from '../../../shared/components/social-link/social-link';

/**
 * Cluster de íconos sociales del footer (LinkedIn, GitHub, WhatsApp, Email).
 * Usa el componente compartido SocialLink para uniformidad de estilo.
 */
@Component({
  selector: 'app-footer-social',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SocialLinkComponent],
  template: `
    <div class="footer-social">
      <app-social-link [icon]="LinkedinIcon" [href]="site.contact.linkedin" ariaLabel="LinkedIn" />
      <app-social-link [icon]="GithubIcon" [href]="site.contact.github" ariaLabel="GitHub" />
      <app-social-link [icon]="WhatsappIcon" [href]="site.contact.whatsappHref" ariaLabel="WhatsApp" />
      <app-social-link [icon]="MailIcon" [href]="'mailto:' + site.contact.email" ariaLabel="Email" [external]="false" />
    </div>
  `,
  styleUrl: './footer-social.scss',
})
export class FooterSocialComponent {
  protected readonly site = SITE;

  protected readonly LinkedinIcon = Linkedin;
  protected readonly GithubIcon = Github;
  protected readonly WhatsappIcon = MessageCircle;
  protected readonly MailIcon = Mail;
}
