import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveHandComponent } from './active-hand.component';

describe('ActiveHandComponent', () => {
  let component: ActiveHandComponent;
  let fixture: ComponentFixture<ActiveHandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveHandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveHandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
