import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

// tslint:disable-next-line: no-input-rename
  @Input('ChartLabels') dChartLabels: Label[] = [];
// tslint:disable-next-line: no-input-rename
  @Input('ChartData') dChartData: MultiDataSet =  [];
// tslint:disable-next-line: no-input-rename
  @Input('ChartType') dChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
