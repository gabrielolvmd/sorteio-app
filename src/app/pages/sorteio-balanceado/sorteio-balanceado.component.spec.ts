import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SorteioBalanceadoComponent } from './sorteio-balanceado.component';

describe('SorteioBalanceadoComponent', () => {
  let component: SorteioBalanceadoComponent;
  let fixture: ComponentFixture<SorteioBalanceadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SorteioBalanceadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SorteioBalanceadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
