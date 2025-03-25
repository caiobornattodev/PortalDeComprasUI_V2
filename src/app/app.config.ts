import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideToastr({
      positionClass : 'toast-bottom-right'
    }),
    provideRouter(routes),
    importProvidersFrom(ModalModule.forRoot())
  ]
};

//TODO : Interceptors
//withInterceptors([errorInterceptor, jwtInterceptor, loadingInterceptor])