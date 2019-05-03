import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GenerationService } from 'src/app/generation-service.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'graph-pop',
  templateUrl: './graph-pop.component.html',
  styleUrls: ['./graph-pop.component.scss']
})
export class GraphPopComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  private _pop: number;
  public get pop(): number {
    return this._pop;
  }
  @Input('height') height;
  @Input('pop')
  public set pop(v: number) {
    this._pop = v;
  }
  init() {
    if (this.gs.generations[0].tours[this._pop]) {
      this.lineChartLabels = this.gs.generations.map((a, i, b) => {
        return '' + i;
      });
      this.lineChartData = [
        {
          data: this.gs.generations.map((a, i, b) => {
            return a.tours[this._pop].Distance;
          }), label: 'Distance'
        },
        {
          data: this.gs.generations.map((a, i, b) => {
            return a.tours[this._pop].Fitness;
          }), label: 'Fitness'
        },
      ]
    }
    console.log(this.lineChartLabels);
    console.log(this.lineChartData);
  }
  upd() {
    console.log(this.chart);
  }
  constructor(public gs: GenerationService) {
    gs.p$.subscribe(a => {
      this.init();
      
    })

  }
  public lineChartData: Array<any> = [
    { data: [0, 1, 2], label: 'Distance' },
    { data: [0, 1, 2], label: 'Fitness', yAxisID: 'y-axis-1', }
  ];

  public lineChartLabels: Array<any> = [''];

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 4
      }
    },
    scales: {
      xAxes: [ {
        id: 'x-axis-0',
        gridLines: {
          display: true,
          drawBorder: true
        },
        ticks: {
          display: true
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            display: true
          }
        },
        {
          id: 'y-axis-1',
          gridLines: {
            display: false,
            drawBorder: false
          },
          position: 'right',
          ticks: {
            display: true
          }
        }
      ]
    }
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#4dc8ff',
      pointBackgroundColor: '#4dc8ff',
      pointBorderColor: '#4dc8ff',
      pointHoverBackgroundColor: '#4dc8ff',
      pointHoverBorderColor: '#4dc8ff'
    }, {
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];

  ngOnInit() {
  }

}
