import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { globalErrorInterceptor } from './core/interceptors/global-error.interceptor';
import { CORE_PROVIDERS } from './core/core.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([globalErrorInterceptor])),
    ...CORE_PROVIDERS,
  ],
};
