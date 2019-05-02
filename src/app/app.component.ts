import { Component } from '@angular/core';
import { GeneticService } from './services/genetic.service';
import { Population } from './models/population.model';
import { TourManager, Tour } from './models/TourManager';
import { City } from './models/city.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  generations: Population[] = [];
  p$ = new BehaviorSubject<Population>(null);
  viewP: Population;
  showCities = false;
  constructor(private ga: GeneticService, ) {
    TourManager.AddCity(new City(60, 200));
    TourManager.AddCity(new City(180, 200));
    TourManager.AddCity(new City(80, 180));
    TourManager.AddCity(new City(140, 180));
    TourManager.AddCity(new City(20, 160));
    TourManager.AddCity(new City(100, 160));
    TourManager.AddCity(new City(200, 160));
    TourManager.AddCity(new City(140, 140));
    TourManager.AddCity(new City(40, 120));
    TourManager.AddCity(new City(100, 120));
    TourManager.AddCity(new City(180, 100));
    TourManager.AddCity(new City(60, 80));
    TourManager.AddCity(new City(120, 80));
    TourManager.AddCity(new City(180, 60));
    TourManager.AddCity(new City(20, 40));
    TourManager.AddCity(new City(100, 40));
    TourManager.AddCity(new City(200, 40));
    TourManager.AddCity(new City(20, 20));
    TourManager.AddCity(new City(60, 20));
    TourManager.AddCity(new City(160, 20));

    this.p$.subscribe(a => {
      this.generations.push(a);
      this.viewP = a;
    })
    this.p$.next(new Population(20, true));
  }
  evolve() {
    var pop = this.ga.evolvePopulation(this.p$.getValue());
    this.p$.next(pop);
  }
  trackCity(i: number, c: City) {
    return "" + c.X + " " + c.Y;
  }
  trackTour(i:number, t: Tour){
    return t.Distance;
  }
  Dist(c:City[], i: number,j: number){
    if(c[i] && c[j]){
    return c[i].distanceTo(c[j]);
    }
    return 0;
  }
}
