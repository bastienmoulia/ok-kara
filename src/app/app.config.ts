import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"ok-kara-3e914","appId":"1:309713203806:web:d8a944e5b5463a615abacf","storageBucket":"ok-kara-3e914.appspot.com","apiKey":"AIzaSyDEAgvuX-69GQKvZl9kKmi9zBV5fMvMjaQ","authDomain":"ok-kara-3e914.firebaseapp.com","messagingSenderId":"309713203806"})), provideFunctions(() => getFunctions()),
  ],
};
