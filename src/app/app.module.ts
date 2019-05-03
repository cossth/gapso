import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewMapComponent } from './components/view-map/view-map.component';
import { GeneticComponent } from './components/genetic/genetic.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewMapComponent,
    GeneticComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
