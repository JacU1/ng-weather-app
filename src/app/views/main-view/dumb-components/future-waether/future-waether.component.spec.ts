import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureWaetherComponent } from './future-waether.component';

describe('FutureWaetherComponent', () => {
  let component: FutureWaetherComponent;
  let fixture: ComponentFixture<FutureWaetherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureWaetherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FutureWaetherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
