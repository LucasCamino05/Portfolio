import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Decoración del Hero: dot grid sutil + dos blobs aurora violetas.
 *
 * 100% CSS, sin JavaScript. Marcado `aria-hidden` porque es puramente
 * decorativo y no aporta semántica.
 */
@Component({
  selector: 'app-hero-decoration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hero-decoration" aria-hidden="true">
      <div class="hero-decoration__grid"></div>
      <div class="hero-decoration__aurora hero-decoration__aurora--1"></div>
      <div class="hero-decoration__aurora hero-decoration__aurora--2"></div>
    </div>
  `,
  styleUrl: './hero-decoration.scss',
})
export class HeroDecorationComponent {}
