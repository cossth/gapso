import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPopComponent } from './graph-pop.component';

describe('GraphPopComponent', () => {
  let component: GraphPopComponent;
  let fixture: ComponentFixture<GraphPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
