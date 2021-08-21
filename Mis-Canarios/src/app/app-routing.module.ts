import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginRegisterComponent } from './componentes/login-register/login-register.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegistroCanariosComponent } from './componentes/registro-canarios/registro-canarios.component';
import { RegistroCrianzaComponent } from './componentes/registro-crianza/registro-crianza.component';


const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: 'inicio', component: InicioComponent},
  { path: 'login-register', component:LoginRegisterComponent},
  { path: 'registro-canarios', component:RegistroCanariosComponent},
  { path: 'registro-crianza', component: RegistroCrianzaComponent},
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
