import { Component, OnDestroy } from '@angular/core';
import { Population } from 'src/app/models/population.model';
import { Tour } from 'src/app/models/TourManager';
import { GenerationService } from 'src/app/generation-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genetic',
  templateUrl: './genetic.component.html',
  styleUrls: ['./genetic.component.scss']
})
export class GeneticComponent implements OnDestroy {
  ngOnDestroy(): void {
    clearTimeout(this.j);
  }
  viewP: Population;
  j;
  constructor(public gs: GenerationService, route: ActivatedRoute, private router: Router) {
    route.paramMap.subscribe(a => {
      let gn = a.get('gen');
      if (gn == 'latest') {
        this.gs.displayGen = gs.generations.length - 1;
      } else {
        this.gs.displayGen = Number.parseInt(gn, 10);
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
    return "" + t.Distance + " " + t.Fitness;
  }
  evolve() {
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
  navigate(i) {
    console.log(i);
    this.router.navigateByUrl('/genetic/gen/' + i);
  }
  generate(i: number) {
    let t = this.gs.generations[0];
    this.gs.generations = [];
    this.gs.p$.next(t);
    this.evauto(i);
  }
  evauto(i: number) {
    this.gs.evolve();
    this.j = setTimeout(() => {
      if (this.gs.generations.length <= i) {
        this.evauto(i);
      }
    }, 100);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
