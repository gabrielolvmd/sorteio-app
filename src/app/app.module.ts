import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DefaultMenuComponent } from './components/default-menu/default-menu.component';
import { GreenButtonComponent } from './components/green-button/green-button.component';
import { BorderButtonComponent } from './components/border-button/border-button.component';
import { SorteioNormalComponent } from './pages/sorteio-normal/sorteio-normal.component';
import { DadosPartidaComponent } from './components/dados-partida/dados-partida.component';
import { FormsModule } from '@angular/forms';
import { SorteioBalanceadoComponent } from './pages/sorteio-balanceado/sorteio-balanceado.component';
import { DadosPartidaBalanceadaComponent } from './components/dados-partida-balanceada/dados-partida-balanceada.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DefaultMenuComponent,
    GreenButtonComponent,
    BorderButtonComponent,
    SorteioNormalComponent,
    DadosPartidaComponent,
    SorteioBalanceadoComponent,
    DadosPartidaBalanceadaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
