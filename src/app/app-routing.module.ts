import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { RegistroComponent} from './registro/registro.component';
import { SolicitudCreditoComponent} from './solicitud-credito/solicitud-credito.component';





const routes: Routes =  [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',component: HomeComponent},
  { path: 'registro', component: RegistroComponent },
  { path: 'solicitud', component: SolicitudCreditoComponent},
  //{ path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
