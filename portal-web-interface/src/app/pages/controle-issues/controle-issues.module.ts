import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './../../shared.module';
import { TimeOnlyModule } from './../../components/template/time-only/time-only.module';
import { ControleIssuesFormComponent } from './form/controle-issues-form.component';
import { ControleIssuesComponent } from './list/controle-issues.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        SharedModule,
        BrowserAnimationsModule,
        BrowserModule,
    ],
    declarations: [ControleIssuesComponent, ControleIssuesFormComponent],
    bootstrap: [ControleIssuesComponent, ControleIssuesFormComponent]
})

export class ControleIssuesModule { }
