import { City } from "./city.model";

export class Tour {
    private tour: City[] = [];
    // Cache
    private fitness = 0;
    private distance = 0;

    // Constructs a blank tour
    constructor(private tourManager: TourManager, tour: City[] = undefined) {
        this.tour = tour;
    }

    public generateIndividual() {
        for (let cityIndex = 0; cityIndex < this.tourManager.CityCount; cityIndex++) {
            this.setCity(cityIndex, this.tourManager.GetCity(cityIndex));
        }
    }

    // Gets a city from the tour
    public getCity(tourPosition: number): City {
        return this.tour[tourPosition];
    }

    // Sets a city in a certain position within a tour
    public setCity(tourPosition: number, city: City) {
        this.tour[tourPosition] = city;
        // If the tours been altered we need to reset the fitness and distance
        this.fitness = 0;
        this.distance = 0;
    }

    // Gets the tours fitness
    public get Fitness() {
        if (this.fitness == 0) {
            this.fitness = 1 / this.Distance;
        }
        return this.fitness;
    }

    // Gets the total distance of the tour
    public get Distance() {
        if (this.distance == 0) {
            let tourDistance = 0;
            // Loop through our tour's cities
            for (let cityIndex = 0; cityIndex < this.tourSize; cityIndex++) {
                // Get city we're travelling from
                let fromCity = this.getCity(cityIndex);
                // City we're travelling to
                let destinationCity: City;
                // Check we're not on our tour's last city, if we are set our 
                // tour's final destination city to our starting city
                if (cityIndex + 1 < this.tourSize) {
                    destinationCity = this.getCity(cityIndex + 1);
                }
                else {
                    destinationCity = this.getCity(0);
                }
                // Get the distance between the two cities
                tourDistance += fromCity.distanceTo(destinationCity);
            }
            this.distance = tourDistance;
        }
        return this.distance;
    }

    // Get number of cities on our tour
    public get tourSize() {
        return this.tour.length;
    }

    // Check if the tour contains a city
    public containsCity(city: City) {
        return this.tour.indexOf(city) !== -1;
    }

    public toString(): string {
        let geneString = "|";
        for (let i = 0; i < this.tourSize; i++) {
            geneString += this.getCity(i) + "|";
        }
        return geneString;
    }
}


export class TourManager {
    private readonly destinationCities: City[] = [];
    public AddCity(city: City) {
        this.destinationCities.push(city);
    }
    public CreateTour(tour: City[] = []) {
       return new Tour(this, tour);
    }
    public GetCity(index: number) {
        return this.destinationCities[index];
    }
    public get CityCount(): number {
        return this.destinationCities.length;
    }
}