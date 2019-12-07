import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { LocalService } from 'src/app/servicios/local.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tab-list-mov-un-loc',
  templateUrl: './tab-list-mov-un-loc.component.html',
  styleUrls: ['./tab-list-mov-un-loc.component.css']
})
export class TabListMovUnLocComponent implements OnInit {

  @Input() rol: string;
  @Input() tipo: string;
  listaUsuarios$: Observable<any[]>;
  listaProductos$: Observable<any[]>;
  listaLocales$: Observable<any[]>;
  usuario$: Observable<any>;
  idDelLocal: string;

  public listaMov$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;


  @Input() idSeleccionado: string;
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
    

    this.usuario$.subscribe(usr => {
      this.localService.traerLocales().subscribe(locs => {
        locs.forEach(loc => {
          if (loc.nombre == usr.local) {
            this.idDelLocal = loc.id;
            console.log(loc.id);
            this.lista$ = this.localService.traerMovLocales(this.idDelLocal);

            this.lista$.subscribe(datos => {
              this.datosTabla = new MatTableDataSource(datos);
            });
          }


        });
      })
    })







    //this.lista$ = this.usuarioService.traerMovUsuarios(this.idSeleccionado);
  }

  cambiarDatos() {
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

  public doFilter = (value: string) => {
    this.datosTabla.filter = value.trim().toLocaleLowerCase();
  }

}
