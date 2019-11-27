import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ProductoService } from 'src/app/servicios/producto.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioInt } from 'src/app/interfaces/usuario-int';

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

  constructor(private productoService: ProductoService, private authService: AuthService) { }

  ngOnInit() {
    this.lista$ = this.productoService.traerProductos();
    console.log(this.lista$);
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'fechaCreacion',
        'local',
        'activo',
        'id'
      ];
    } else {
      this.columnasTabla = [
        'nombre',
        'costo',
        'cantidad',
        'fechaCreacion',
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

  cambiarCantidadProducto(cantidad: number){
    
    
    this.usuario$ = this.authService.traerUsuarioActivo();
    console.log(cantidad);  
    
    this.usuario$.subscribe(usuario => {      
      this.nombreApellido = usuario.nombre + ' ' + usuario.apellido;
      console.log("El usuario "+this.nombreApellido+" cambio la cantidad a "+cantidad);
    });

    
  }

}
