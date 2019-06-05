import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCatalogComponent } from './workout-catalog.component';

describe('WorkoutCatalogComponent', () => {
  let component: WorkoutCatalogComponent;
  let fixture: ComponentFixture<WorkoutCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
