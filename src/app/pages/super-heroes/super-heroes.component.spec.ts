import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesComponent } from './super-heroes.component';

describe('SuperHeroesComponent', () => {
  let component: SuperHeroesComponent;
  let fixture: ComponentFixture<SuperHeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
