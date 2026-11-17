import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      license:
        'eyJpZCI6ImIwZWRmNzU5LThiZmQtNDRhOC1hNzVlLTU1ZWRkNzUyZGM2ZiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTQ5MjA5MDEsImV4cCI6MTgyNjQ1NjkwMX0.NZQncJGnGCvGX868CrdMDkMiQfNQzkbbNzTCKX_G3j51LyxoY394zbvBIUo3JLSXN6mzoXAoaHyAfFLDLJBkDQ',
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.p-dark',
        },
      },
    }),
  ],
};
