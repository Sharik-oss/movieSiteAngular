import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Register Swiper custom elements

// Polyfills for WebTorrent
(window as any).global = window;
(window as any).process = {
  env: { NODE_ENV: 'production' },
};

// Enable WebTorrent debug logs

// Bootstrap Angular application
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true, // Optimize Angular event handling
  })
  .catch((err) => console.error('Angular bootstrap error:', err));
