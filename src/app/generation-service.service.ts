import { Injectable } from '@angular/core';
import { Population } from './models/population.model';
import { BehaviorSubject } from 'rxjs';
import { GeneticService } from './services/genetic.service';
import { TourManager } from './models/TourManager';
import { City } from './models/city.model';

@Injectable({
  providedIn: 'root'
})
export class GenerationService {
  generations: Population[] = [];
  p$ = new BehaviorSubject<Population>(null);
  constructor(private ga: GeneticService) {
    console.log('Created');
    this.init();
  }
  init() {
    TourManager.AddCity(new City(0, 200));
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
    this.p$.next(new Population(20, true));
  }
  evolve() {
    var pop = this.ga.evolvePopulation(this.p$.getValue());
    this.p$.next(pop);
  }
}
