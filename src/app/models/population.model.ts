import { Tour, TourManager } from './tour';

export class Population {
    tours: Tour[] = [];
    constructor(tourmanager: TourManager,populationSize: number, initialise: boolean) {
        this.tours = new Tour[populationSize];
        if (initialise) {
            // Loop and create individuals
            for (let i = 0; i < this.PopulationSize; i++) {
                let newTour = tourmanager.CreateTour();
                newTour.generateIndividual();
                this.saveTour(i, newTour);
            }
        }
    }
    
    public saveTour(index: number, tour: Tour) {
        this.tours[index] = tour;
    }
    
    public getTour(index: number) {
        return this.tours[index];
    }

    public get Fittest(): Tour {
         let fittest = this.tours[0];
        for (let i = 1; i < this.PopulationSize; i++) {
            if (fittest.Fitness <= this.getTour(i).Fitness) {
                fittest = this.getTour(i);
            }
        }
        return fittest;
    }

    public get PopulationSize() {
        return this.tours.length;
    }
}