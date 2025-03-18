import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      extendedTimeOut: 1000,
      tapToDismiss: true,
      newestOnTop: true,
      maxOpened: 3,
    }), // Toastr providers
  ]
};
