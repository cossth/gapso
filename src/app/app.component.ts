import { Component } from '@angular/core';
import { GeneticService } from './services/genetic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(ga: GeneticService){
    
  }
}
