import { ControleIssuesModel } from '../models/controle-issues.models';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControleIssuesService {

  urlBase =  'http://localhost:3001/issues';
 
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    ) { }

  mostrarMensagem(msg: string) {
    this.snackBar.open(msg, 'OK', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  create(objeto: ControleIssuesModel): Observable<any> {
    return this.http.post(this.urlBase, objeto);     
  }

  find(): Observable<ControleIssuesModel> {
    return this.http.get<ControleIssuesModel>(this.urlBase);
  }

  findById(id): Observable<ControleIssuesModel> {
    return this.http.get<ControleIssuesModel>(`${this.urlBase}/${id}`);
  }  
  
  delete(id): Observable<ControleIssuesModel> {
    return this.http.delete<ControleIssuesModel>(`${this.urlBase}/${id}`);
  }

  update(objeto: ControleIssuesModel): Observable<ControleIssuesModel> {
    let url = `${this.urlBase}/${objeto.id}`;
    return this.http.put<ControleIssuesModel>(url, objeto);
  }
}
