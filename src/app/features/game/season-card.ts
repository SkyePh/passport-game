import { Component, computed, input } from '@angular/core';

export type SeasonName = 'spring' | 'summer' | 'autumn' | 'winter';

@Component({
  selector: 'app-season-card',
  host: { class: 'block h-full' },
  template: `
    <div class="season-card" [style.background-image]="'url(' + src() + ')'">
      <div class="season-card-copy">
        <ng-content />
      </div>
    </div>
  `,
})
export class SeasonCard {
  readonly season = input.required<SeasonName>();
  readonly src = computed(() => `${this.season()}.png`);
}
