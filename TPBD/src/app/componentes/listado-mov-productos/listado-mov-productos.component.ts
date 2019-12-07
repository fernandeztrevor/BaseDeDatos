import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/servicios/producto.service';
import { MatTableDataSource } from '@angular/material';
import { MovimientoService } from 'src/app/servicios/movimiento.service';

@Component({
  selector: 'app-listado-mov-productos',
  templateUrl: './listado-mov-productos.component.html',
  styleUrls: ['./listado-mov-productos.component.css']
})
export class ListadoMovProductosComponent implements OnInit {
  //public lista$: Observable<any[]>;
  public listaMov$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;

  @Input() idSeleccionado:string;
  @Input() lista$: Observable<any[]>;

  constructor(private productoService: ProductoService, private movimientoService: MovimientoService) { }

  ngOnInit() {
    this.columnasTabla = [
      'producto',
      'usuario',
      'local',
      'tipo',
      'cantidad'
    ];
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

  cambiarDatos(){
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

}
