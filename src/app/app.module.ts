import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReqResPageComponent } from './req-res/components/req-res-page/req-res-page.component';
import { PersonCardComponent } from './req-res/components/person-card/person-card.component';
import { AuthInterceptor } from './shared/interceptors/auth-interceptor.interceptor';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { CachingInterceptor } from './shared/interceptors/caching.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ReqResPageComponent,
    PersonCardComponent,
    WelcomeComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { 

// L'opzione multi: true informa Angular ch e il provider è multiplo, 
//cioè che il provider è un array di valori.

}
