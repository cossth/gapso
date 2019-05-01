export class Population {

    // Holds population of tours
    tours: Tour[] = [];

    // Construct a population
    public Population(populationSize: number, initialise: boolean) {
        this.tours = new Tour[populationSize];
        // If we need to initialise a population of tours do so
        if (initialise) {
            // Loop and create individuals
            for (let i = 0; i < this.populationSize(); i++) {
                let newTour = new Tour();
                newTour.generateIndividual();
                this.saveTour(i, newTour);
            }
        }
    }
    
    // Saves a tour
    public saveTour(index: number, tour: Tour) {
        this.tours[index] = tour;
    }
    
    // Gets a tour from population
    public getTour(index: number) {
        return this.tours[index];
    }

    // Gets the best tour in the population
    public get Fittest(): Tour {
         let fittest = this.tours[0];
        // Loop through individuals to find fittest
        for (let i = 1; i < this.populationSize(); i++) {
            if (fittest.getFitness() <= this.getTour(i).getFitness()) {
                fittest = this.getTour(i);
            }
        }
        return fittest;
    }

    // Gets population size
    public populationSize() {
        return this.tours.length;
    }
}