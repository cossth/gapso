import { Component } from '@angular/core';
import { GenerationService } from './generation-service.service';
import { TourManager } from './models/TourManager';
import { City } from './models/city.model';
import { Population } from './models/population.model';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
 constructor(public gs: GenerationService){}
}
