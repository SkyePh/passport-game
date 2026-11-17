import { Component, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { GameService } from '../../core/services/game.service';
import { MAX_GUESSES } from '../../core/models/passport.model';

@Component({
  selector: 'app-how-to-play-dialog',
  imports: [Dialog, Button, Divider],
  template: `
    <p-dialog
      header="How to play Cleared!"
      [modal]="true"
      [dismissableMask]="true"
      [(visible)]="visible"
      [style]="{ width: '40rem' }"
      (onHide)="game.dismissHowTo()"
    >
      <p>Guess the mystery passport in {{ maxGuesses }} tries. Each guess is a real country.</p>
      <p>
        After every guess, six clues light up using the values from
        <span class="font-semibold">your guess</span>:
      </p>
      <ul class="pl-3">
        <li>Cover colour</li>
        <li>Continent</li>
        <li>Approximate visa-free destinations</li>
        <li>Biometric chip</li>
        <li>Regional bloc</li>
        <li>Cover script</li>
      </ul>
      <div class="flex flex-wrap gap-2 my-3">
        <div
          class="w-7rem h-4rem border-round-xl bg-green-500 text-white flex align-items-center justify-content-center font-bold text-sm"
        >
          Exact
        </div>
        <div
          class="w-7rem h-4rem border-round-xl bg-orange-500 text-white flex align-items-center justify-content-center font-bold text-sm"
        >
          Close
        </div>
        <div
          class="w-7rem h-4rem border-round-xl bg-red-500 text-white flex align-items-center justify-content-center font-bold text-sm"
        >
          Far
        </div>
      </div>
      <p>
        Visa-free is green only on an exact count. One off (or up to 20 away) is orange, with
        an arrow toward the mystery number. Counts are approximate mobility scores, not an
        official index.
      </p>
      <p-divider />
      <p>
        After you find it — or run out of guesses — a country briefing appears under the board:
        about the place, photos, food, climate, sights, and how to get around.
      </p>
      <ng-template #footer>
        <p-button label="Let's fly" icon="pi pi-check" (onClick)="close()" />
      </ng-template>
    </p-dialog>
  `,
})
export class HowToPlayDialog {
  readonly game = inject(GameService);
  readonly maxGuesses = MAX_GUESSES;

  get visible(): boolean {
    return this.game.showHowTo();
  }

  set visible(value: boolean) {
    if (!value) {
      this.game.dismissHowTo();
    } else {
      this.game.openHowTo();
    }
  }

  close(): void {
    this.game.dismissHowTo();
  }
}
