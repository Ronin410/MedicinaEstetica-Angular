import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HojaclinicaComponent } from './hojaclinica.component';

describe('HojaclinicaComponent', () => {
  let component: HojaclinicaComponent;
  let fixture: ComponentFixture<HojaclinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HojaclinicaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HojaclinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
