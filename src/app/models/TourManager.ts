import { City } from "./city.model";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TourManager {
    private static readonly destinationCities: City[] = [];
    public static AddCity(city: City) {
        TourManager.destinationCities.push(city);
    }
    public static CreateTour(tour: City[] = []) {
        return new Tour(tour);
    }
    public static GetCity(index: number) {
        return TourManager.destinationCities[Math.floor(index)];
    }
    public static get CityCount(): number {
        return TourManager.destinationCities.length;
    }
}

export class Tour {
    public cities: City[] = [];
    private fitness = 0;
    private distance = 0;

    constructor(tour: City[] = undefined) {
        if (tour === undefined) {
            for (let i = 0; i < TourManager.CityCount; i++) {
                this.cities.push(null);
            }
        } else {
            this.cities = tour;
        }
    }

    public generateIndividual() {
        for (let cityIndex = 0; cityIndex < TourManager.CityCount; cityIndex++) {
            this.setCity(cityIndex, TourManager.GetCity(cityIndex));
        }
        this.cities = this.shuffle(this.cities);
    }
    private shuffle(arr: City[]) {
        var i: number;
        var j: number;
        var temp: City;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    };

    public getCity(tourPosition: number): City {
        return this.cities[Math.floor(tourPosition)%this.tourSize];
    }

    public setCity(tourPosition: number, city: City) {
        this.cities[tourPosition] = city;
        this.fitness = 0;
        this.distance = 0;
    }

    public get Fitness() {
        if (this.fitness === 0) {
            this.fitness = 1 / this.Distance;
        }
        return this.fitness;
    }

    public get Distance() {
        if (this.distance === 0) {
            let tourDistance = 0;
            for (let cityIndex = 0; cityIndex < this.tourSize; cityIndex++) {
                let fromCity = this.getCity(cityIndex);
                let destinationCity = this.getCity(cityIndex + 1);
                if(destinationCity === null){
                    console.log(this.cities);
                }
                tourDistance += fromCity.distanceTo(destinationCity);
            }
            this.distance = tourDistance;
        }
        return this.distance;
    }

    public get tourSize() {
        return this.cities.length;
    }

    public containsCity(city: City) {
        return this.cities.indexOf(city) !== -1;
    }

    public toString(): string {
        let geneString = "|";
        for (let i = 0; i < this.tourSize; i++) {
            geneString += this.getCity(i) + "|";
        }
        return geneString;
    }
}


