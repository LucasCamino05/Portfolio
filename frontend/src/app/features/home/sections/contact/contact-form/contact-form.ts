import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, Send } from 'lucide-angular';
import { ContactService } from '../../../../../core/services/contact.service';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Formulario de contacto reactivo. Encapsula:
 *   - Estado del envío (idle / loading / success / error) vía signal.
 *   - Validaciones (Reactive Forms + i18n keys).
 *   - Llamado al backend a través de {@link ContactService}.
 *
 * Componente cerrado: no recibe inputs ni emite outputs. Es 100%
 * autosuficiente para que el padre (Contact) solo tenga que componer.
 */
@Component({
  selector: 'app-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contact = inject(ContactService);

  protected readonly SendIcon = Send;
  protected readonly status = signal<FormStatus>('idle');

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
    this.contact.send(this.form.getRawValue()).subscribe({
      next: () => {
        this.status.set('success');
        this.form.reset();
      },
      error: () => this.status.set('error'),
    });
  }
}
