import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/services/header.service";

@Component({
  selector: "app-integrantes",
  templateUrl: "./integrantes.component.html",
  styleUrls: ["./integrantes.component.css"],
})
export class IntegrantesComponent implements OnInit {
  public exibir: boolean = false;
  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: "Integrantes",
      icon: "group",
      routeUrl: "/integrantes",
    };
  }

  ngOnInit(): void {}

  exibirCartao() {
    this.exibir === true ? this.exibir = false : this.exibir = true;
  }
}
