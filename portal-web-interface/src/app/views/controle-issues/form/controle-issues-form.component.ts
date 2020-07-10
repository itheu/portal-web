import { ControleIssuesService } from '../../../services/controle-issues.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { ControleIssuesModel } from 'src/app/models/controle-issues.models';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-controle-issues-form',
  templateUrl: './controle-issues-form.component.html',
  styleUrls: ['./controle-issues-form.component.css'],
})
export class ControleIssuesFormComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly controleIssuesService: ControleIssuesService,
    private location: Location,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private readonly _utilsService: UtilsService,
    private headerService: HeaderService
  ) {
    headerService.headerData = {
      title: 'Formulário Lançamento de Issues',
      icon: 'work',
      routeUrl: '/lancamento-issues/form'
    }
  }

  public isNew = true;
  public formGroup: FormGroup;
  public data: any;

  tipo: any = [];
  ultimoId: any = null;

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      numIssue: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      data: [new Date(), [Validators.required]],
      horarios: this._formBuilder.array([]),
    });
    let id = this.route.snapshot.params['id'];
    this.loadEntidade(id);
  }

  get horarios(): FormArray {
    return <FormArray>this.formGroup.get('horarios');
  }

  loadEntidade(id: any) {
    if (id) {
      this.controleIssuesService
        .findById(id)
        .subscribe((res: ControleIssuesModel) => {
          this.data = res;
          this.isNew = false;
          this.incializaFormArray();
        });
    } else {
      this.data = {};
      this.isNew = true;
      this.incializaFormArray();
    }
  }

  incializaFormArray() {
    this._utilsService.criaFormArray(this.formGroup,() => this.addHorarios(), this.data, 'horarios');
    this.formGroup.patchValue(this.converteCamposParaForm(this.data));
  }

  newForm() {
    this.isNew = true;
    this.data = {};
    this.formGroup.patchValue(this.converteCamposParaForm(this.data));
  }

  verificaIdHorario() {
    let proxId = this.formGroup.value.horarios.length;
    return proxId + 1;
  }

  criarHorario() {
    return this._formBuilder.group({
      id: [this.verificaIdHorario(), []],
      horaInicio: ['', []],
      horaFim: ['', []],
      horastrabalhas: ['', []],
    });
  }

  atualizaHora(row) {
    for (const horario of this.formGroup.value.horarios) {
      if (horario.id === +row.value.id) {
        let tothoras = this._utilsService.subtraiHora(
          horario.horaInicio,
          horario.horaFim
        );
        horario.horastrabalhas = tothoras;
      }
    }
    this.formGroup.controls.horarios.setValue(this.formGroup.value.horarios);
  }

  addHorarios() {
    (this.formGroup.get('horarios') as FormArray).push(this.criarHorario());
  }

  excluirHorario(index: number) {
    (this.formGroup.get('horarios') as FormArray).removeAt(index);
  }

  salvar() {
    if (this.formGroup.valid) {
      Object.assign(this.data, this.desconverteCampos(this.formGroup.value));
      if (this.data.id) {
        this.controleIssuesService.update(this.data).subscribe(() => {
          this.controleIssuesService.mostrarMensagem(
            'Registro atualizado com sucesso!'
          );
          this.cancelar();
        });
      } else {
        this.controleIssuesService.create(this.data).subscribe(() => {
          this.controleIssuesService.mostrarMensagem(
            'Registro salvo com sucesso!'
          );
          this.cancelar();
        });
      }
    }
  }

  cancelar() {
    this.router.navigate([`view/lancamento-issues`]);
  }
  converteCamposParaForm(objeto) {
    // objeto.horarios = objeto.horarios || [];
    return objeto;
  }

  desconverteCampos(objeto) {
    return objeto;
  }
}
