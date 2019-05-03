import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city.model';
import { GenerationService } from 'src/app/generation-service.service';
import { Tour } from 'src/app/models/TourManager';
import { BehaviorSubject } from 'rxjs';
import anime from 'animejs';

@Component({
  selector: 'view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss']
})
export class ViewMapComponent implements OnInit, AfterViewInit, OnDestroy {
  _g : number = undefined;
  _p : number = undefined;
  @Input('gen') set gen(a: number){
    this._g = a;
    this.display(a,this._p);
    console.log('Gen' + a);
  }
  @Input('pop') set pop(a: number){
    this._p = a;
    this.display(this._g,a);
    console.log('Pop' + a);
  }
  travelTime = 600;
  ngOnDestroy(): void {
    clearTimeout(this.i);
    clearTimeout(this.j);
  }
  @ViewChild('mc') mc: ElementRef;
  @HostListener('window:resize')
  onResize() {
    let x = this.mc.nativeElement.offsetWidth - 80;
    this.w = Math.min(x, 600);
  }
  pp = 0;
  i;
  set PathPos(i: number) {
    this.pp = Math.min(i, this.cities.length - 1);
    this.pathTo(i);
  }
  j: any;
  w = 400;
  tour = new BehaviorSubject<Tour>(null);
  cities: City[] = [];
  display(g,p){
    
    let gens = this.gs.generations[g];
    if (gens) {
      let trx =gens.tours[p];
      if(trx){
        this.tour.next(trx);
      }
    }
  }
  constructor(route: ActivatedRoute, private gs: GenerationService) {
    route.paramMap
      .subscribe(a => {
        this.display(this._g || Number.parseInt(a.get('gen'), 10), this._p || Number.parseInt(a.get('pop'), 10));
      });
    this.tour.subscribe(a => {
      if(a){
        this.cities = a.cities;
        this.i = setTimeout(() => {
          this.animateAll();
          this.PathPos = 0;
        }, 300);
      }
    });
  }

  ngAfterViewInit(): void {
  }
  ngOnInit() {
    this.onResize();
  }
  getColor(i: number) {
    if (i == 0) {
      return '#00F'
    }
    if (i == this.cities.length - 1) {
      return '#00F'
    }
    return `rgba(${Math.floor(i * 255 / this.cities.length)},${Math.floor((this.cities.length - i) * 255 / this.cities.length)},0,1)`;
  }
  anim() {
    this.animateAll();
  }
  animateAll() {
    anime({
      targets: '.dot',
      width: ['20px', '40px', '20px'],
      height: ['20px', '40px', '20px'],
      backgroundColor: '#FFF',
      easing: 'easeInOutQuad'
    });
  }
  next() {
    clearInterval(this.j);
    this.PathPos = this.pp + 1;
  }
  play() {
    clearInterval(this.j);
    this.PathPos = (this.pp === this.cities.length - 1) ? 0 : this.pp + 1;
    this.j = setTimeout(() => {
      if (this.pp + 1 < this.cities.length) {
        this.play();
      } else {
        clearTimeout(this.j);
        console.log('Cleared');
      }
    }, this.travelTime);
  }
  pathTo(n: number) {
    anime({
      targets: '.path',
      left: this.cities[n].X / 2 + "%",
      top: this.cities[n].Y / 2 + "%",
      backgroundColor: '#FFF',
      easing: 'easeInOutQuad',
      duration: this.travelTime
    });
  }
}
