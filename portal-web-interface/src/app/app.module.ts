import { ControleIssuesModule } from './pages/controle-issues/controle-issues.module';
import { TimeOnlyModule } from './components/template/time-only/time-only.module';
import { TimeOnlyComponent } from './components/template/time-only/time-only.component';
import { LOCALE_ID } from '@angular/core';
import { FooterComponent } from './components/template/footer/footer.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { ControleIssuesFormComponent } from './pages/controle-issues/form/controle-issues-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared.module';
import { ControleIssuesComponent } from './pages/controle-issues/list/controle-issues.component';
 
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { IntegrantesComponent } from './pages/integrantes/integrantes.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IntegrantesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ControleIssuesModule
  ],
  exports: [
    SharedModule,
    ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
