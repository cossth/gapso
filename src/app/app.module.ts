import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewMapComponent } from './components/view-map/view-map.component';
import { GeneticComponent } from './components/genetic/genetic.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardContentComponent } from './components/card-content/card-content.component';
import { ChartsModule } from 'ng2-charts';
import { GraphPopComponent } from './components/graph-pop/graph-pop.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewMapComponent,
    GeneticComponent,
    CardContentComponent,
    GraphPopComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
