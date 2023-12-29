import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteioNormalComponent } from './sorteio-normal.component';

describe('SorteioNormalComponent', () => {
  let component: SorteioNormalComponent;
  let fixture: ComponentFixture<SorteioNormalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteioNormalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorteioNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
