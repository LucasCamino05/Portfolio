import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { ThemeService } from './core/services/theme.service';
import { FooterComponent } from './layout/footer/footer';
import { HeaderComponent } from './layout/header/header';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Eager-instanciar para que tema e idioma se inicialicen en el primer paint.
  private readonly theme = inject(ThemeService);
  private readonly lang = inject(LanguageService);
}
