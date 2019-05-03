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
    this.displayGen = this.generations.length - 1;
  }
  
  private _showCities = false;
  public get showCities() : boolean {
    return this._showCities;
  }
  public set showCities(v : boolean) {
    this._showCities = v;
  }
  
  private _displayGen = 0;
  public get displayGen() : number {
    return this._displayGen === -1?0:this._displayGen;
  }
  public set displayGen(v : number) {
    this._displayGen = v;
  }
  
  private _viewPop = -1;
  public get viewPop() : number {
    return this._viewPop;
  }
  public set viewPop(v : number) {
    this._viewPop = v;
  }
  
  private _showBtn = true;
  public get showBtn() : boolean {
    return this._showBtn;
  }
  public set showBtn(v : boolean) {
    this._showBtn = v;
  }
  
}
