import { Component, OnInit, Input } from '@angular/core';
import { LocalService } from 'src/app/servicios/local.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { MovimientoService } from 'src/app/servicios/movimiento.service';

@Component({
  selector: 'app-listado-mov-locales',
  templateUrl: './listado-mov-locales.component.html',
  styleUrls: ['./listado-mov-locales.component.css']
})
export class ListadoMovLocalesComponent implements OnInit {
  
  public listaMov$: Observable<any[]>;
  //public lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  
  @Input() idSeleccionado:string;
  @Input() lista$: Observable<any[]>;

  constructor(private localService: LocalService, private movimientoService: MovimientoService) { }

  ngOnInit() {
  console.log("chla");
 
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
