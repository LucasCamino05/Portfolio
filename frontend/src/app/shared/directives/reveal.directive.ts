import { afterNextRender, Directive, ElementRef, inject, OnDestroy } from '@angular/core';

/**
 * Hace fade-in + translateY(0) cuando el host entra al viewport.
 * Las clases CSS están en `_animations.scss` (.reveal / .reveal.is-visible).
 *
 * Uso: <section appReveal>...</section>
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      el.classList.add('reveal');

      // Si IntersectionObserver no existe (entornos viejos), revelamos directamente.
      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('is-visible');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible');
              this.observer?.unobserve(el);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
