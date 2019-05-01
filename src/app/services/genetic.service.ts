import { Injectable } from '@angular/core';
import { Population } from '../models/population.model';
import { Tour, TourManager } from '../models/tour';

@Injectable({
  providedIn: 'root'
})
export class GeneticService {

  private static readonly mutationRate = 0.015;
  private static readonly  tournamentSize = 5;
  private static readonly  elitism = true;
  static tourManager: TourManager = new TourManager();
  public static  evolvePopulation(pop:Population):Population {
      let newPopulation = new Population(this.tourManager,pop.PopulationSize, false);

      let elitismOffset = 0;
      if (GeneticService.elitism) {
          newPopulation.saveTour(0, pop.Fittest);
          elitismOffset = 1;
      }

      for (let i = elitismOffset; i < newPopulation.PopulationSize; i++) {
          let parent1 = GeneticService.tournamentSelection(pop);
          let parent2 = GeneticService.tournamentSelection(pop);
          let child = GeneticService.crossover(parent1, parent2);
          newPopulation.saveTour(i, child);
      }

      for (let i = elitismOffset; i < newPopulation.PopulationSize; i++) {
          GeneticService.mutate(newPopulation.getTour(i));
      }

      return newPopulation;
  }

  public static crossover(parent1: Tour, parent2: Tour): Tour {
      let child = new Tour(this.tourManager);
      let startPos = Math.random() * parent1.tourSize;
      let endPos = Math.random() * parent1.tourSize;
      for (let i = 0; i < child.tourSize; i++) {
          if (startPos < endPos && i > startPos && i < endPos) {
              child.setCity(i, parent1.getCity(i));
          } else if (startPos > endPos) {
              if (!(i < startPos && i > endPos)) {
                  child.setCity(i, parent1.getCity(i));
              }
          }
      }

      for (let i = 0; i < parent2.tourSize; i++) {
          if (!child.containsCity(parent2.getCity(i))) {
              for (let ii = 0; ii < child.tourSize; ii++) {
                  if (child.getCity(ii) == null) {
                      child.setCity(ii, parent2.getCity(i));
                      break;
                  }
              }
          }
      }
      return child;
  }

  private static mutate(tour: Tour) {
      for(let tourPos1=0; tourPos1 < tour.tourSize; tourPos1++){
          if(Math.random() < GeneticService.mutationRate){
              let tourPos2 = tour.tourSize * Math.random();

              let city1 = tour.getCity(tourPos1);
              let city2 = tour.getCity(tourPos2);
              tour.setCity(tourPos2, city1);
              tour.setCity(tourPos1, city2);
          }
      }
  }

  private static tournamentSelection(pop: Population): Tour {
      let tournament = new Population(this.tourManager,GeneticService.tournamentSize, false);
      for (let  i = 0; i < GeneticService.tournamentSize; i++) {
          let randomId = Math.random() * pop.PopulationSize;
          tournament.saveTour(i, pop.getTour(randomId));
      }
      let fittest = tournament.Fittest;
      return fittest;
  }
}
