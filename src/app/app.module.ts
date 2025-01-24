import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {AboutComponent} from './about/about.component';
import {CardComponent} from './card/card.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule} from '@ngx-translate/core';
import {provideTranslation} from '../provideTranslation';
import {FooterComponent} from './footer/footer.component';
import {register} from 'swiper/element/bundle';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

register();

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesListComponent,
    AboutComponent,
    CardComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot(provideTranslation()),

  ],
  providers: [provideHttpClient(), provideAnimationsAsync()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule {
}

