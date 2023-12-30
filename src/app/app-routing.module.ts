import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SorteioNormalComponent } from './pages/sorteio-normal/sorteio-normal.component';
import { SorteioBalanceadoComponent } from './pages/sorteio-balanceado/sorteio-balanceado.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'sorteio-normal',
    component: SorteioNormalComponent,
  },
  {
    path: 'sorteio-balanceado',
    component: SorteioBalanceadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
