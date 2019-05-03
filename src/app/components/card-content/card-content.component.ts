import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GenerationService } from 'src/app/generation-service.service';
import { BehaviorSubject } from 'rxjs';
import { Tour } from 'src/app/models/TourManager';
import { City } from 'src/app/models/city.model';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent implements OnInit {

  _g : number = undefined;
  _p : number = undefined;
  tour = new BehaviorSubject<Tour>(null);
  @Input('gen') set gen(a: number){
    this._g = a;
    this.display(a,this._p);
    console.log('Gen' + a);
  }
  @Input('pop') set pop(a: number){
    this._p = a;
    this.display(this._g,a);
    console.log('Pop' + a);
  }
  constructor(public gs: GenerationService) { }
  display(g,p){
    let gens = this.gs.generations[g];
    if (gens) {
      let trx =gens.tours[p];
      if(trx){
        this.tour.next(trx);
      }
    }
  }
  ngOnInit() {
  }

  Dist(c: City[], i: number, j: number) {
    if (c[i] && c[j]) {
      return c[i].distanceTo(c[j]);
    }
    return 0;
  }
  
  trackCity(c: City) {
    return "" + c.X + " " + c.Y;
  }
}
