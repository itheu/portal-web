import { UtilsService } from "src/app/services/utils.service";
import { ControleIssuesService } from "../../../services/controle-issues.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: "app-controle-issues",
  templateUrl: "./controle-issues.component.html",
  styleUrls: ["./controle-issues.component.css"],
})
export class ControleIssuesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  displayedColumns: string[] = [
    "id",
    "numIssue",
    "descricao",
    "horastrabalhas",
    "data",
    "action",
  ];
  dataSource: any[];

  public horas: any[] = [0];
  public minutos: any[] = [0];
  public tothoras: any;
  public locked = false;

  constructor(
    private readonly router: Router,
    private location: Location,
    private readonly controleIssuesService: ControleIssuesService,
    private readonly _utilsService: UtilsService,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Listagem Lançamento de Issues',
      icon: 'list',
      routeUrl: '/lancamento-issues'
    }
  }

  ngOnInit() {
    this.controleIssuesService.find().subscribe((res: any) => {


      let hh: any[] = [];
      let mm: any[] = [];
      for (const r of res) {
        for (const h of r.horarios) {
          if (h.horastrabalhas.length > 0) {
            this.horas.push(h.horastrabalhas.substring(0, 2));
            this.minutos.push(h.horastrabalhas.substring(3, 5));

            hh.push(h.horastrabalhas.substring(0, 2));
            mm.push(h.horastrabalhas.substring(3, 5));
          }
        }
        r.horastrabalhas = this.returnTotList(hh, mm);
      }
      this.returnTots();

      this.dataSource = res;
      if (this.tothoras.substring(3, 5) == 60) {
        this.tothoras = this.formataHora(
          this.tothoras.substring(0, 2),
          this.tothoras.substring(3, 5)
        );
      }
    });
  }

  returnTotList(hh, mm) {
    let tot;
    hh = hh.reduce((a, b) => +a + +b);
    mm = mm.reduce((a, b) => +a + +b);

    hh = hh.toString().padStart(2, "0");
    mm = mm.toString().padStart(2, "0");

    // if (mm == 60) mm = '00'; hh += 1;
    return (tot = `${hh}:${mm}`);
  }

  returnTots() {
    let horas;
    let minutos;
    this.horas = this.horas.reduce((a, b) => +a + +b);
    this.minutos = this.minutos.reduce((a, b) => +a + +b);

    horas = this.horas.toString().padStart(2, "0");
    minutos = this.minutos.toString().padStart(2, "0");

    this.tothoras = `${horas}:${minutos}`;
  }

  formataHora(hh, mm) {
    let hora: any = +hh;
    let minuto: any = +mm;
    hora = hora + 1;
    minuto = "00";
    return `${String(hora).padStart(2, "0")}:${minuto}`;
  }

  refresh() {
    location.reload();
  }

  liberarTarefa(row) {
    console.log('Implementar...')
    this.refresh();
  }

  concluirTarefa(row) {
    console.log('Implementar...')
    this.refresh();
  }

  adicionar() {
    this.router.navigate([`view/lancamento-issues/form`]);
  }

  editar(row) {
    this.router.navigate([`view/lancamento-issues/form/${row.id}`]);
  }

  remover(row) {
    this.controleIssuesService.delete(row.id).subscribe(() => {
      this.controleIssuesService.mostrarMensagem('Registro excluído com sucesso!');
      this.refresh();
    });
  }
}
