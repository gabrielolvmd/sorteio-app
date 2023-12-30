import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPartidaBalanceadaComponent } from './dados-partida-balanceada.component';

describe('DadosPartidaBalanceadaComponent', () => {
  let component: DadosPartidaBalanceadaComponent;
  let fixture: ComponentFixture<DadosPartidaBalanceadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPartidaBalanceadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosPartidaBalanceadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
