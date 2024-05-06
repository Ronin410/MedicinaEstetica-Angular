import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergentMessageComponent } from './emergent-message.component';

describe('EmergentMessageComponent', () => {
  let component: EmergentMessageComponent;
  let fixture: ComponentFixture<EmergentMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergentMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergentMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
