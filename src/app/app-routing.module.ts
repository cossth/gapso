import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneticComponent } from './components/genetic/genetic.component';
import { ViewMapComponent } from './components/view-map/view-map.component';

const routes: Routes = [{
  path: '', redirectTo: 'genetic',
  pathMatch: 'full'
}
  , { path: 'view/:gen/:pop', component: ViewMapComponent }
  , { path: 'genetic', component: GeneticComponent }
  , { path: 'genetic/gen/:gen', component: GeneticComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
