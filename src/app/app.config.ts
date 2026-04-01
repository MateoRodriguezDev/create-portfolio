import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/interceptors/auth.interceptors';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor,
      ])
    ), provideFirebaseApp(() => initializeApp({ projectId: "createportfolio-31018", appId: "1:797063378849:web:85f7e547d360a406e27de0", storageBucket: "createportfolio-31018.firebasestorage.app", apiKey: "AIzaSyClmHAuGaD2Y6WN0Lwljhx2uBBPZSdYYbw", authDomain: "createportfolio-31018.firebaseapp.com", messagingSenderId: "797063378849", measurementId: "G-HYL0TJNHD5"})), provideAuth(() => getAuth()), provideStorage(() => getStorage()),
  ]
};
