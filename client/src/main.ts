import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [{ provide: LOCALE_ID, useValue: 'ru_RU' }]
})
  .catch(err => console.error(err));
