import { Component, ElementRef, afterNextRender, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { Image } from 'primeng/image';
import { SeasonCard } from './season-card';
import { GameService } from '../../core/services/game.service';
import { SightFact, WikiService } from '../../core/services/wiki.service';
import { climateKind, seasonsFor } from '../../core/services/climate';
import { landscapeFor, landscapeSrc } from '../../core/services/landscape';
import { outletsFor } from '../../core/services/outlets';
import { flagUrl } from '../../core/services/compare';

@Component({
  selector: 'app-country-reveal',
  imports: [Button, Card, Image, SeasonCard],
  template: `
    @if (passport; as country) {
      <div class="reveal-bento">
        <p-card
          class="reveal-header reveal-identity-card"
          [style.--identity-art]="'url(' + landscapeArt + ')'"
        >
          @if (game.status() === 'won') {
            <p class="font-bold text-green-500 text-sm mt-0 mb-3">Correct answer!</p>
          } @else {
            <p class="font-bold text-red-500 text-sm mt-0 mb-3">Time's up — here's the answer</p>
          }
          <div class="flex align-items-center gap-3">
            <img [src]="flag(country.id)" [alt]="country.name" class="reveal-flag" />
            <div>
              <div class="text-4xl font-bold line-height-2">{{ country.name }}</div>
              <div class="text-color-secondary">Capital: {{ country.education.capital }}</div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="reveal-pill">
              <i class="pi pi-globe"></i>{{ country.continent }}
            </span>
            <span class="reveal-pill">
              <i class="pi pi-send"></i>{{ country.visaFreeCount }} visa-free
            </span>
            <span class="reveal-pill">
              <i class="pi pi-car"></i>{{ country.education.drivingSide }}-hand driving
            </span>
          </div>
        </p-card>

        <p-card class="reveal-about" styleClass="h-full reveal-about-card">
          <h3 class="mt-0 mb-2">
            <i class="pi pi-info-circle mr-2"></i>About {{ country.name }}
          </h3>
          <p class="mt-0 mb-0 line-height-3">{{ aboutText }}</p>
        </p-card>

        <p-card class="reveal-facts" styleClass="h-full">
          <h3 class="mt-0 mb-3"><i class="pi pi-sparkles mr-2"></i>Key facts</h3>
          <div class="flex flex-column gap-3">
            <div class="flex gap-2">
              <i class="pi pi-id-card mt-1"></i>
              <span>{{ country.education.funFact }}</span>
            </div>
            <div class="flex gap-2">
              <i class="pi pi-map-marker mt-1"></i>
              <span>Country in {{ country.continent }}.</span>
            </div>
            <div class="flex gap-2">
              <i class="pi pi-verified mt-1"></i>
              <span>
                {{ country.name }} issues a
                <span class="capitalize">{{ country.coverColor }}</span>
                {{ biometricLine(country.biometric) }} passport.
              </span>
            </div>
          </div>
        </p-card>

        <p-card class="reveal-climate" styleClass="h-full">
          <div class="flex align-items-center justify-content-between mb-2">
            <h3 class="mt-0 mb-0"><i class="pi pi-sun mr-2"></i>Climate &amp; seasons</h3>
            <span class="reveal-pill">
              <i class="pi pi-cloud"></i>{{ kind }}
            </span>
          </div>
          @if (facts()?.climate?.extract; as climate) {
            <p class="mt-0 mb-3 line-height-3">{{ shorten(climate, 220) }}</p>
          } @else {
            <p class="mt-0 mb-3 line-height-3">
              {{ country.name }} sits in a {{ kind.toLowerCase() }} climate belt. Here's a
              simple seasonal snapshot:
            </p>
          }
          <div class="reveal-seasons">
            @for (season of seasons; track season.name) {
              <app-season-card [season]="season.tone">
                <div class="text-sm font-semibold">{{ season.months }}</div>
                <p class="text-sm mt-0 mb-0 line-height-3">{{ season.blurb }}</p>
                <div class="flex flex-wrap gap-3 text-sm">
                  <span><i class="pi pi-sun mr-1"></i>{{ season.temp }}</span>
                  <span><i class="pi pi-cloud mr-1"></i>{{ season.rain }}</span>
                </div>
              </app-season-card>
            }
          </div>
        </p-card>

        <p-card class="reveal-sights" styleClass="h-full">
          <h3 class="mt-0 mb-3"><i class="pi pi-map-marker mr-2"></i>Things to see &amp; do</h3>
          <div class="flex gap-2">
            @for (sight of sights; track sight.name) {
              <div class="flex-1 text-center">
                @if (sight.image) {
                  <p-image
                    [src]="sight.image"
                    [alt]="sight.name"
                    imageClass="reveal-sight"
                    [preview]="true"
                  />
                } @else {
                  <div class="reveal-sight-fallback">{{ sight.name.charAt(0) }}</div>
                }
                <p class="text-sm font-semibold mt-2 mb-0">{{ sight.name }}</p>
              </div>
            }
          </div>
        </p-card>

        <p-card class="reveal-plugs" styleClass="h-full reveal-plugs-card">
          <h3 class="mt-0 mb-3"><i class="pi pi-bolt mr-2"></i>Plugs &amp; sockets</h3>
          <div class="reveal-plugs-list">
            @for (plug of plugs; track plug.type) {
              <div class="reveal-plug">
                <img [src]="plug.icon" [alt]="plug.label" />
                <span>{{ plug.label }}</span>
              </div>
            }
          </div>
        </p-card>

        <p-card class="reveal-travel" styleClass="h-full reveal-travel-card">
          <h3 class="mt-0 mb-2"><i class="pi pi-car mr-2"></i>Getting around</h3>
          <p class="mt-0 mb-0 line-height-3">
            Traffic keeps to the
            <span class="font-semibold">{{ country.education.drivingSide }}</span>.
            @if (country.education.metro.length) {
              {{ country.education.metro[0].city }} has a metro:
              {{ country.education.metro[0].note }}
            }
          </p>
        </p-card>

        <div class="reveal-again">
          <p-button
            label="Play again"
            icon="pi pi-refresh"
            severity="success"
            [rounded]="true"
            (onClick)="game.playAgain()"
          />
        </div>
      </div>
    }
  `,
})
export class CountryReveal {
  readonly game = inject(GameService);
  private readonly wiki = inject(WikiService);
  private readonly host = inject(ElementRef<HTMLElement>);

  readonly passport = this.game.target();
  readonly facts = toSignal(this.wiki.load(this.passport), {
    initialValue: null,
  });
  readonly seasons = seasonsFor(this.passport.continent);
  readonly kind = climateKind(this.passport.continent);
  readonly landscapeArt = landscapeSrc(landscapeFor(this.passport));
  readonly plugs = outletsFor(this.passport.education.outlets);

  get sights(): SightFact[] {
    return (
      this.facts()?.sights ??
      this.passport.education.attractions.slice(0, 3).map((name) => ({ name }))
    );
  }

  get aboutText(): string {
    return this.shorten(this.facts()?.about || this.passport.education.funFact, 420);
  }

  constructor() {
    afterNextRender(() => {
      this.host.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  flag(id: string): string {
    return flagUrl(id, 320);
  }

  biometricLine(value: string): string {
    if (value === 'face+fingerprint') {
      return 'biometric (face + fingerprint)';
    }
    if (value === 'face') {
      return 'biometric (face)';
    }
    return 'non-biometric';
  }

  shorten(text: string, max: number): string {
    if (text.length <= max) {
      return text;
    }
    const cut = text.slice(0, max);
    const period = cut.lastIndexOf('.');
    return period > 120 ? cut.slice(0, period + 1) : `${cut.trimEnd()}…`;
  }
}
