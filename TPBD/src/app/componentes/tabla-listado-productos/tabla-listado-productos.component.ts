import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ProductoService } from 'src/app/servicios/producto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioInt } from 'src/app/interfaces/usuario-int';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ProductoInt } from 'src/app/interfaces/producto-Int';
import { MovimientoService } from 'src/app/servicios/movimiento.service';
import { TipoMovimiento } from '../../enums/tipo-movimiento.enum';
import { LocalService } from 'src/app/servicios/local.service';
import { LOADIPHLPAPI } from 'dns';

@Component({
  selector: 'app-tabla-listado-productos',
  templateUrl: './tabla-listado-productos.component.html',
  styleUrls: ['./tabla-listado-productos.component.css'],
  animations: [
    trigger('expandirDetalle', [
      state('colapsar', style({ height: '0px', minHeight: '0' })),
      state('expandir', style({ height: '*' })),
      transition('expandir <=> colapsar', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class TablaListadoProductosComponent implements OnInit {
  @Input() rol: string;
  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  productoExpandido: ['foto', 'description', 'observaciones'] | null;
  usuario$: Observable<UsuarioInt>;
  nombreApellido: string;
  productos: AngularFirestoreCollection;
  cantidadNueva: number = 0;

  constructor(private productoService: ProductoService, private authService: AuthService, private angularFireStore: AngularFirestore, private movimientoService: MovimientoService, private localService: LocalService) {
    this.productos = this.angularFireStore.collection<ProductoInt>('productos');
  }

  ngOnInit() {
    this.lista$ = this.productoService.traerProductos();
    //console.log(this.lista$);
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'fechaCreacion',
        'local',
        'activo',
        //'id'
      ];
    } else {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'fechaCreacion',
        'local',
        'activo'
      ];
    }
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

  deshabilitarProductos(id: string) {
    this.productoService.deshabilitarProducto(id);
  }
  habilitarProductos(id: string) {
    this.productoService.habilitarProducto(id);
  }

  sumarCantidadProducto(cantidad: number, id: string) {

    this.usuario$ = this.authService.traerUsuarioActivo();

    this.usuario$.subscribe(usuario => {


      this.productos.doc(`${id}`).ref.get().then(
        product => {
          let cant: number;
          let idLocal: string;

          cant = product.get('cantidad');
          cant = cant + cantidad;
          console.log(cant, cantidad);
          this.productos.doc(id).update({ cantidad: cant });

          const movimientosTmp = {
            tipo: TipoMovimiento.agregar,
            usuario: usuario.email,
            producto: product.get('nombre'),
            local: product.get('local'),
            cantidad: 0
          }

          this.localService.traerLocales().subscribe(locales => {
            locales.forEach(localFE => {

              if (localFE.nombre == product.get('local')) {
                idLocal = localFE.id;
                //console.log(localFE.id, product.get('local'));
              }
            });
            //console.log(idLocal, movimientosTmp);
            this.movimientoService.persistirMovimiento(movimientosTmp, id, "productos");
            this.movimientoService.persistirMovimiento(movimientosTmp, usuario.id, "usuarios");
            this.movimientoService.persistirMovimiento(movimientosTmp, idLocal, "locales");
          });
        }

      );

    });

    this.cantidadNueva = 0;
  }

  restarCantidadProducto(cantidad: number, id: string) {

    this.usuario$ = this.authService.traerUsuarioActivo();

    this.usuario$.subscribe(usuario => {

      this.productos.doc(`${id}`).ref.get().then(
        product => {
          let cant: number;
          let idLocal: string;

          cant = product.get('cantidad');
          if (cant >= cantidad) {
            cant = cant - cantidad;
            this.productos.doc(id).update({ cantidad: cant });
          }
          //console.log(cant, cantidad);
          const movimientosTmp = {
            tipo: TipoMovimiento.sacar,
            usuario: usuario.email,
            producto: product.get('nombre'),
            local: product.get('local'),
            cantidad: 0
          }

          this.localService.traerLocales().subscribe(locales => {
            locales.forEach(localFE => {

              if (localFE.nombre == product.get('local')) {
                idLocal = localFE.id;
                //console.log(localFE.id, product.get('local'));
              }
            });
            //console.log(idLocal, movimientosTmp);
            this.movimientoService.persistirMovimiento(movimientosTmp, id, "productos");
            this.movimientoService.persistirMovimiento(movimientosTmp, usuario.id, "usuarios");
            this.movimientoService.persistirMovimiento(movimientosTmp, idLocal, "locales");
          });
        }
      );
    });
    this.cantidadNueva = 0;
  }

}
