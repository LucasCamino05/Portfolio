import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import {
  Download,
  FileText,
  Github,
  Linkedin,
  LucideAngularModule,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-angular';
import { ContactService } from '../../../../core/services/contact.service';
import { SITE } from '../../../../data/site.config';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { SectionTitleComponent } from '../../../../shared/components/section-title/section-title';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    TranslatePipe,
    RevealDirective,
    SectionTitleComponent,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);

  protected readonly site = SITE;
  protected readonly status = signal<FormStatus>('idle');

  protected readonly MailIcon = Mail;
  protected readonly LinkedinIcon = Linkedin;
  protected readonly GithubIcon = Github;
  protected readonly WhatsappIcon = MessageCircle;
  protected readonly DownloadIcon = Download;
  protected readonly FileTextIcon = FileText;
  protected readonly SendIcon = Send;

  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('loading');
    const payload = this.form.getRawValue();

    this.contact.send(payload).subscribe({
      next: () => {
        this.status.set('success');
        this.form.reset();
      },
      error: () => {
        this.status.set('error');
      },
    });
  }
}
