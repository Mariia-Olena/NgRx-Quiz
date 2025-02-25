import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DICTIONARIES_TOKEN } from './tokens/dictionaries.token';
import { DICTIONARIES } from './data/dictionaries';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: DICTIONARIES_TOKEN, useValue: DICTIONARIES },
  ],
};
