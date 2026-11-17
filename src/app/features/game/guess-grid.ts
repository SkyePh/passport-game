import { Component, inject } from '@angular/core';
import { Image } from 'primeng/image';
import { CATEGORY_HEADERS, MatchTone } from '../../core/models/passport.model';
import { GameService } from '../../core/services/game.service';
import { flagUrl } from '../../core/services/compare';

@Component({
  selector: 'app-guess-grid',
  imports: [Image],
  template: `
    @if (game.guesses().length) {
      <div class="overflow-x-auto pb-2">
        <div class="flex flex-column align-items-center gap-3 min-w-max mx-auto">
          <div class="flex gap-2">
            <div
              class="w-6rem flex align-items-center justify-content-center border-round-3xl surface-card border-1 surface-border px-2 py-2 text-xs font-semibold text-center"
            >
              Passport
            </div>
            @for (header of headers; track header.key) {
              <div
                class="w-6rem flex align-items-center justify-content-center border-round-3xl surface-card border-1 surface-border px-2 py-2 text-xs font-semibold text-center"
              >
                {{ header.label }}
              </div>
            }
          </div>

          @for (guess of game.guesses(); track guess.passport.id) {
            <div class="flex gap-2 guess-row">
              <div class="guess-tile surface-card border-1 surface-border">
                <p-image
                  [src]="flag(guess.passport.id)"
                  [alt]="guess.passport.name"
                  width="40"
                  [preview]="false"
                />
                <span class="text-xs font-semibold text-center line-height-2">{{
                  guess.passport.name
                }}</span>
              </div>
              @for (category of guess.categories; track category.key; let i = $index) {
                <div
                  class="guess-tile text-white"
                  [class]="toneClass(category.tone)"
                  [style.animation-delay]="(i + 1) * 80 + 'ms'"
                >
                  @if (category.arrow === 'up') {
                    <i class="pi pi-arrow-up"></i>
                  }
                  @if (category.arrow === 'down') {
                    <i class="pi pi-arrow-down"></i>
                  }
                  <span>{{ category.value }}</span>
                </div>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class GuessGrid {
  readonly game = inject(GameService);
  readonly headers = CATEGORY_HEADERS;

  flag(id: string): string {
    return flagUrl(id);
  }

  toneClass(tone: MatchTone): string {
    if (tone === 'green') {
      return 'bg-green-500';
    }
    if (tone === 'orange') {
      return 'bg-orange-500';
    }
    return 'bg-red-500';
  }
}
