import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosPartidaComponent } from './dados-partida.component';

describe('DadosPartidaComponent', () => {
  let component: DadosPartidaComponent;
  let fixture: ComponentFixture<DadosPartidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosPartidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosPartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
