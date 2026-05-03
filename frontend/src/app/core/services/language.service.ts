import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'es' | 'en';

const STORAGE_KEY = 'lang';
const SUPPORTED: Language[] = ['es', 'en'];
const DEFAULT_LANG: Language = 'es';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly doc = inject(DOCUMENT);

  private readonly _lang = signal<Language>(this.readInitialLang());
  readonly lang = this._lang.asReadonly();

  constructor() {
    this.translate.addLangs(SUPPORTED);
    this.translate.setFallbackLang(DEFAULT_LANG);

    effect(() => {
      const value = this._lang();
      this.translate.use(value);
      this.doc.documentElement.setAttribute('lang', value);
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* ignore */
      }
    });
  }

  toggle(): void {
    this._lang.update((l) => (l === 'es' ? 'en' : 'es'));
  }

  set(value: Language): void {
    if (SUPPORTED.includes(value)) {
      this._lang.set(value);
    }
  }

  private readInitialLang(): Language {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch {
      /* ignore */
    }
    const browser = (navigator.language || DEFAULT_LANG).slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser as Language) ? (browser as Language) : DEFAULT_LANG;
  }
}
