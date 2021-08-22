import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginRegisterComponent } from './componentes/login-register/login-register.component';
import { RegistroCanariosComponent } from './componentes/registro-canarios/registro-canarios.component';
import { RegistroCrianzaComponent } from './componentes/registro-crianza/registro-crianza.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { NavbarComponent } from './componentes/navbar/navbar.component';
//material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CrearRegistroComponent } from './componentes/registro-canarios/crear-registro/crear-registro.component';
import { EditarRegistroComponent } from './componentes/registro-canarios/editar-registro/editar-registro.component';
import { MostrarRegistroComponent } from './componentes/registro-canarios/mostrar-registro/mostrar-registro.component';
import { MostrarLineaComponent } from './componentes/registro-canarios/mostrar-linea/mostrar-linea.component';
import { ModalComponent } from './componentes/registro-canarios/modal/modal.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    LoginRegisterComponent,
    RegistroCanariosComponent,
    RegistroCrianzaComponent,
    CrearRegistroComponent,
    EditarRegistroComponent,
    MostrarRegistroComponent,
    MostrarLineaComponent,
    ModalComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
