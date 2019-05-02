import { Tour } from './tour';
import { TourManager } from './TourManager';

export class Population {
    tours: Tour[] = [];
    constructor(populationSize: number, initialise: boolean) {
        this.tours = new Array<Tour>(populationSize);
        if (initialise) {
            for (let i = 0; i < this.PopulationSize; i++) {
                let newTour = TourManager.CreateTour();
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