import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Image } from 'primeng/image';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { GameService } from './core/services/game.service';
import { HowToPlayDialog } from './features/game/how-to-play-dialog';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    Toolbar,
    Button,
    Image,
    ToggleSwitch,
    Toast,
    HowToPlayDialog,
  ],
  templateUrl: './app.html',
})
export class App {
  readonly game = inject(GameService);
}
