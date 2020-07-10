import { ControleIssuesFormComponent } from './views/controle-issues/form/controle-issues-form.component';
import { ControleIssuesComponent } from './views/controle-issues/list/controle-issues.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrantesComponent } from './views/integrantes/integrantes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'view/home',
    component: HomeComponent,
  },
  {
    path: 'view/lancamento-issues',
    component: ControleIssuesComponent,
  },
  {
    path: 'view/lancamento-issues/form',
    component: ControleIssuesFormComponent,
  },  
  {
    path: 'view/lancamento-issues/form/:id',
    component: ControleIssuesFormComponent,
  },  
  {
    path: 'view/integrantes',
    component: IntegrantesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule],
  providers: [ ],
})
export class AppRoutingModule { }
