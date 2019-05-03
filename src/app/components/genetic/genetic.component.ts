import { Component } from '@angular/core';
import { Population } from 'src/app/models/population.model';
import { TourManager, Tour } from 'src/app/models/TourManager';
import { City } from 'src/app/models/city.model';
import { GenerationService } from 'src/app/generation-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genetic',
  templateUrl: './genetic.component.html',
  styleUrls: ['./genetic.component.scss']
})
export class GeneticComponent {
  viewP: Population;
  showCities = false;
  pop = -1;
  private ge = 0;
  j;
  public get curGen(){
    return this.ge;
  }
  public set curGen(i: number){
    this.viewP = this.gs.generations[i];
    this.ge = i;
  }
  constructor(public gs: GenerationService, route: ActivatedRoute, router: Router) {
    route.paramMap.subscribe( a =>{
      let gn  = a.get('gen');
      if(gn == 'latest'){
        this.curGen = gs.generations.length - 1;
      }else{
        this.curGen = Number.parseInt(gn,10);
      }
    })
    this.gs.p$.subscribe(a => {
      if (gs.generations[gs.generations.length - 1] != a) {
        this.gs.generations.push(a);
        this.curGen = gs.generations.length - 1;
        router.navigateByUrl('/genetic/gen/latest');
      }
      this.viewP = a;
    })
  }
  trackCity(c: City) {
    return "" + c.X + " " + c.Y;
  }
  trackTour(t: Tour) {
    return ""+ t.Distance+" " + t.Fitness;
  }
  Dist(c: City[], i: number, j: number) {
    if (c[i] && c[j]) {
      return c[i].distanceTo(c[j]);
    }
    return 0;
  }
  evolve(){
    this.gs.evolve();
  }
  
  auto() {
    this.gs.evolve();
    this.j = setTimeout(() => {
      this.auto();
    }, 1000);
  }
  stop() {
    clearInterval(this.j);
    this.j = undefined;
  }
}
