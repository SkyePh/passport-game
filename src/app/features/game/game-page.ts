import { Component, effect, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { ProgressBar } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { GameService } from '../../core/services/game.service';
import { MAX_GUESSES } from '../../core/models/passport.model';
import { GuessInput } from './guess-input';
import { GuessGrid } from './guess-grid';
import { CountryReveal } from './country-reveal';

@Component({
  selector: 'app-game-page',
  imports: [Card, ProgressBar, GuessInput, GuessGrid, CountryReveal],
  template: `
    <div class="mx-auto w-full flex flex-column gap-3">
      <p-card header="Name that passport" class="mx-auto w-full md:w-8">
        <p class="mt-0">
          Six clues. Six guesses. One mystery booklet from a roster of
          {{ game.roster.length }} passports.
        </p>
        <p-progressbar [value]="game.progress()" [showValue]="false" />
        <p class="text-sm text-color-secondary">
          {{ game.guesses().length }} / {{ maxGuesses }} guesses used
        </p>
      </p-card>

      <p-card class="mx-auto w-full md:w-8">
        <app-guess-input />
      </p-card>

      <app-guess-grid />

      @if (game.status() !== 'playing') {
        <div class="mx-auto w-full md:w-10">
          <app-country-reveal />
        </div>
      }
    </div>
  `,
})
export class GamePage {
  readonly game = inject(GameService);
  readonly maxGuesses = MAX_GUESSES;
  private readonly messages = inject(MessageService);

  constructor() {
    effect(() => {
      if (this.game.poolResetNotice()) {
        this.messages.add({
          severity: 'info',
          summary: 'Fresh stamp book',
          detail: "You've cleared every passport. Starting a new pool.",
        });
      }
    });
  }
}
