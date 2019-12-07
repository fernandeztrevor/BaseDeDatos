
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { LocalService } from 'src/app/servicios/local.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
//import { UsuarioInt } from '../interfaces/usuario-int';

@Component({
  selector: 'app-tabla-listado-movimientos',
  templateUrl: './tabla-listado-movimientos.component.html',
  styleUrls: ['./tabla-listado-movimientos.component.css']
})
export class TablaListadoMovimientosComponent implements OnInit {

  @Input() rol: string;
  @Input() tipo: string;
  listaUsuarios$: Observable<any[]>;
  listaProductos$: Observable<any[]>;
  listaLocales$: Observable<any[]>;
  usuario$: Observable<any>;

  public listaMov$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;


  @Input() idSeleccionado:string;
  @Input() lista$: Observable<any[]>;

  constructor(private authService: AuthService, private usuarioService: UsuarioService, private productoService: ProductoService, private localService: LocalService, private angularFireStore: AngularFirestore) { }

  ngOnInit() {
    this.columnasTabla = [
      'producto',
      'usuario',
      'local',
      'tipo',
      'cantidad'
    ];

    // this.lista$.subscribe(datos => {
    //   this.datosTabla = new MatTableDataSource(datos);
    // });
    this.usuario$ = this.authService.traerUsuarioActivo();    

    this.usuario$.subscribe(usr=>{
      this.lista$ = this.usuarioService.traerMovUsuarios(usr.id);
      this.lista$.subscribe(datos => {
        this.datosTabla = new MatTableDataSource(datos);
      });
    });

    

    //this.lista$ = this.usuarioService.traerMovUsuarios(this.idSeleccionado);
  }

  cambiarDatos(){
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

  public doFilter = (value: string) => {
    this.datosTabla.filter = value.trim().toLocaleLowerCase();
  }

}
