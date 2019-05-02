import { City } from "./city.model";
import { Tour } from './tour';
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
