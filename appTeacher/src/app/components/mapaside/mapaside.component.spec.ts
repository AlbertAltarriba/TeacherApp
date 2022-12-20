import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapasideComponent } from './mapaside.component';

describe('MapasideComponent', () => {
  let component: MapasideComponent;
  let fixture: ComponentFixture<MapasideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapasideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapasideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
