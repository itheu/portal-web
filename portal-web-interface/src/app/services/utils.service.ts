import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class UtilsService {

    dataAtualFormatada(data) {
        let dia = data.substring(8, 10);
        let mes = data.substring(5, 7);
        let ano = data.substring(0, 4);;
        return `${dia}/${mes}/${ano}`;
    }

    subtraiHora(hrA, hrB) {
        if (hrA.length != 5 || hrB.length != 5) return "00:00";

        let temp: any = 0;
        let nova_h: any = 0;
        let novo_m: any = 0;

        let hora1 = hrA.substr(0, 2) * 1;
        let hora2 = hrB.substr(0, 2) * 1;
        let minu1 = hrA.substr(3, 5) * 1;
        let minu2 = hrB.substr(3, 5) * 1;

        temp = minu1 - minu2;
        if (temp < 0) temp = temp * -1;
        novo_m = temp.toString().length == 2 ? temp : ("0" + temp);

        temp = hora1 - hora2 - nova_h;
        if (temp < 0) temp = temp * -1;
        nova_h = temp.toString().length == 2 ? temp : ("0" + temp);
        if (nova_h < 0) nova_h = nova_h * -1;

        return nova_h + ':' + novo_m;
    }


    criaFormArray<T>(fg: FormGroup, method: Function, data: T, chave: string) {
        let tamanho = (fg.get(chave) as FormArray).length;
        let total: number;
        if (Array.isArray(data)) {
            total = data.length;
        } else {
            total = (data[chave] || []).length;
        }
        while (tamanho < total) {
            method();
            tamanho++;
        }
    }
}