import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Github, Linkedin, LucideAngularModule, Mail, MessageCircle } from 'lucide-angular';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';
import { SITE } from '../../data/site.config';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, TranslatePipe, ThemeToggleComponent, LanguageSwitcherComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  protected readonly site = SITE;
  protected readonly year = new Date().getFullYear();

  protected readonly LinkedinIcon = Linkedin;
  protected readonly GithubIcon = Github;
  protected readonly MailIcon = Mail;
  protected readonly MessageCircleIcon = MessageCircle;
}
