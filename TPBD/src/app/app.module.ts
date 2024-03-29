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
import { AuthService } from "./servicios/auth.service";
import { UsuarioService } from "./servicios/usuario.service";
import { MatMenuModule } from "@angular/material/menu";
import { LoginComponent } from './componentes/login/login.component';
import { PaginaPrincipalComponent } from './componentes/pagina-principal/pagina-principal.component';
import { PaginaNoEncontradaComponent } from './componentes/pagina-no-encontrada/pagina-no-encontrada.component';
import { AltaLocalComponent } from './componentes/alta-local/alta-local.component';
import { BarraHerramientasComponent } from './componentes/barra-herramientas/barra-herramientas.component';
import { TablaListadoLocalesComponent } from './componentes/tabla-listado-locales/tabla-listado-locales.component';
import { TablaListadoMovimientosComponent } from './componentes/tabla-listado-movimientos/tabla-listado-movimientos.component';
import { TablaListadoProductosComponent } from './componentes/tabla-listado-productos/tabla-listado-productos.component';
import { TablaListadoUsuariosComponent } from './componentes/tabla-listado-usuarios/tabla-listado-usuarios.component';
import { MatSidenavModule, MatExpansionModule, MatTableModule, MatPaginatorModule, MatSelectModule } from '@angular/material';
import { ProductoService } from './servicios/producto.service';
import { LocalService } from './servicios/local.service';
import { BarraTituloComponent } from './componentes/barra-titulo/barra-titulo.component';
import { MovimientoService } from './servicios/movimiento.service';
import { ListadoMovUsuariosComponent } from './componentes/listado-mov-usuarios/listado-mov-usuarios.component';
import { ListadoMovLocalesComponent } from './componentes/listado-mov-locales/listado-mov-locales.component';
import { ListadoMovProductosComponent } from './componentes/listado-mov-productos/listado-mov-productos.component';
import { TablaListadoMovLocComponent } from './componentes/tabla-listado-mov-loc/tabla-listado-mov-loc.component';
import { TablaListadoMovProdComponent } from './componentes/tabla-listado-mov-prod/tabla-listado-mov-prod.component';
import { TablaListadoMovUsrComponent } from './componentes/tabla-listado-mov-usr/tabla-listado-mov-usr.component';
import { TablaListadoLocalUsrComponent } from './componentes/tabla-listado-local-usr/tabla-listado-local-usr.component';
import { TabListMovUnLocComponent } from './componentes/tab-list-mov-un-loc/tab-list-mov-un-loc.component';

@NgModule({
  declarations: [
    AppComponent,
    AltaUsuarioComponent,
    AltaProductoComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    PaginaNoEncontradaComponent,
    AltaLocalComponent,
    BarraHerramientasComponent,
    TablaListadoLocalesComponent,
    TablaListadoMovimientosComponent,
    TablaListadoProductosComponent,
    TablaListadoUsuariosComponent,
    BarraTituloComponent,
    ListadoMovUsuariosComponent,
    ListadoMovLocalesComponent,
    ListadoMovProductosComponent,
    TablaListadoMovLocComponent,
    TablaListadoMovProdComponent,
    TablaListadoMovUsrComponent,
    TablaListadoLocalUsrComponent,
    TabListMovUnLocComponent
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
    MatMenuModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [
    AngularFirestore,
    AngularFireStorage,
    AngularFireAuth,
    AuthService,
    UsuarioService,
    FormBuilder,
    ProductoService,
    LocalService,
    MovimientoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }