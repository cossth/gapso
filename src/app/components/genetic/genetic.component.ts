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
  j;
  genCount = 0;
  constructor(public gs: GenerationService, route: ActivatedRoute, router: Router) {
    route.paramMap.subscribe( a =>{
      let gn  = a.get('gen');
      if(gn == 'latest'){
        this.gs.displayGen = gs.generations.length - 1;
      }else{
        this.gs.displayGen = Number.parseInt(gn,10);
      }
    })
    this.gs.p$.subscribe(a => {
      if (gs.generations[gs.generations.length - 1] != a) {
        this.gs.generations.push(a);
        router.navigateByUrl('/genetic/gen/latest');
      }
      this.viewP = a;
    })
  }
  trackTour(t: Tour) {
    return ""+ t.Distance+" " + t.Fitness;
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
