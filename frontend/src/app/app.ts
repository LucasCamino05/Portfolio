import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './core/services/language.service';
import { MetaService } from './core/services/meta.service';
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
  // Eager-instanciar para que tema, idioma y meta-tags se inicialicen
  // en el primer paint.
  private readonly theme = inject(ThemeService);
  private readonly lang = inject(LanguageService);
  private readonly meta = inject(MetaService);

  constructor() {
    this.meta.start();
  }
}
