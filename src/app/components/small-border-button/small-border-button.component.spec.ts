import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallBorderButtonComponent } from './small-border-button.component';

describe('SmallBorderButtonComponent', () => {
  let component: SmallBorderButtonComponent;
  let fixture: ComponentFixture<SmallBorderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallBorderButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallBorderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
