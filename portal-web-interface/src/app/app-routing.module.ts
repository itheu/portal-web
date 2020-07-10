import { ControleIssuesFormComponent } from './pages/controle-issues/form/controle-issues-form.component';
import { ControleIssuesComponent } from './pages/controle-issues/list/controle-issues.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrantesComponent } from './pages/integrantes/integrantes.component';

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
