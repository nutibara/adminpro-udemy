// tslint:disable-next-line: quotemark
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styles: []
})
export class ProgressComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  progreso1: number = 50;
  progreso2: number = 20;

  constructor() {}

  ngOnInit() {}

  actualizar(event: number){
    console.log('Evento: ', event);
    this.progreso1 = event;
  }

}
