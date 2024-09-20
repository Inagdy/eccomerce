import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { headerInterceptor } from './core/interceptor/header.interceptor';
import { errorsInterceptor } from './core/interceptor/errors.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([headerInterceptor, errorsInterceptor])
    ),
    importProvidersFrom(BrowserAnimationsModule),

    provideAnimations(),
    // required animations providers
    provideToastr(), // Toastr providers
  ],
};
