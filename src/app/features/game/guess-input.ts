import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { AutoCompleteCompleteEvent } from 'primeng/types/autocomplete';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { MessageService } from 'primeng/api';
import { Passport } from '../../core/models/passport.model';
import { GameService } from '../../core/services/game.service';
import { flagUrl } from '../../core/services/compare';

@Component({
  selector: 'app-guess-input',
  imports: [FormsModule, AutoComplete, Button, FloatLabel, InputGroup],
  template: `
    <p-inputgroup>
      <p-floatlabel class="flex-1" variant="in">
        <p-autocomplete
          inputId="country-guess"
          [(ngModel)]="selected"
          [suggestions]="suggestions()"
          (completeMethod)="search($event)"
          optionLabel="name"
          [dropdown]="true"
          dropdownMode="blank"
          [forceSelection]="true"
          [fluid]="true"
          [virtualScroll]="true"
          [virtualScrollItemSize]="40"
          scrollHeight="20rem"
          [disabled]="game.status() !== 'playing'"
        >
          <ng-template #item let-passport>
            <div class="flex align-items-center gap-2">
              <img [src]="flag(passport.id)" [alt]="passport.name" width="24" height="16" />
              <span>{{ passport.name }}</span>
            </div>
          </ng-template>
        </p-autocomplete>
        <label for="country-guess">Guess a country</label>
      </p-floatlabel>
      <p-button
        label="Guess"
        icon="pi pi-send"
        [disabled]="game.status() !== 'playing' || !selected"
        (onClick)="submit()"
      />
    </p-inputgroup>
  `,
})
export class GuessInput {
  readonly game = inject(GameService);
  private readonly messages = inject(MessageService);

  selected: Passport | null = null;
  readonly suggestions = signal<Passport[]>([]);

  flag(id: string): string {
    return flagUrl(id, 40);
  }

  search(event: AutoCompleteCompleteEvent): void {
    const query = event.query.trim().toLowerCase();
    const roster = this.game.roster;
    const matches = query
      ? roster.filter(
          (passport) =>
            passport.name.toLowerCase().includes(query) ||
            passport.aliases?.some((alias) => alias.toLowerCase().includes(query)),
        )
      : roster;
    this.suggestions.set([...matches].sort((a, b) => a.name.localeCompare(b.name)));
  }

  submit(): void {
    if (!this.selected || this.game.status() !== 'playing') {
      return;
    }
    if (this.game.guesses().some((guess) => guess.passport.id === this.selected?.id)) {
      this.messages.add({
        severity: 'warn',
        summary: 'Already guessed',
        detail: `You already tried ${this.selected.name}.`,
      });
      return;
    }
    this.game.submit(this.selected);
    this.selected = null;
  }
}
