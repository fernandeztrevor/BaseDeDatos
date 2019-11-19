import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AltaProductoComponent } from "./componentes/alta-producto/alta-producto.component";
import { AltaUsuarioComponent } from "./componentes/alta-usuario/alta-usuario.component";
//import { BarraTituloComponent } from "./componentes/barra-titulo/barra-titulo.component";
//import { LoginComponent } from "./componentes/login/login.component";
import { AuthService } from "./servicios/auth.service";
import { UsuarioService } from "./servicios/usuario.service";
//import { PaginaNoEncontradaComponent } from "./componentes/pagina-no-encontrada/pagina-no-encontrada.component";
//import { PaginaPrincipalComponent } from "./componentes/pagina-principal/pagina-principal.component";
//import { BarraHerramientasComponent } from "./componentes/barra-herramientas/barra-herramientas.component";
import { MatMenuModule } from "@angular/material/menu";
import { LoginComponent } from './componentes/login/login.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaUsuarioComponent,
    AltaProductoComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    PaginaNoEncontradaComponent,
    //LoginComponent,
    //BarraTituloComponent,
    //PaginaNoEncontradaComponent,
    //PaginaPrincipalComponent,
    //BarraHerramientasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MaterialFileInputModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage,
    AngularFireAuth,
    AuthService,
    UsuarioService,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}