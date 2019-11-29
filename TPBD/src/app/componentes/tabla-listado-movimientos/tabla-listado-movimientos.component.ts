
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

  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;

  constructor(private usuarioService: UsuarioService, private productoService: ProductoService, private localService: LocalService, private angularFireStore: AngularFirestore) { }

  ngOnInit() {
    this.listaUsuarios$ = this.usuarioService.traerUsuarios();
    this.listaProductos$ = this.productoService.traerProductos();
    this.listaLocales$ = this.localService.traerLocales();

    console.log(this.listaLocales$);
  }

}
