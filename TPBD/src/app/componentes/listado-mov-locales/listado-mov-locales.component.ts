import { Component, OnInit } from '@angular/core';
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
  public lista$: Observable<any[]>;
  public listaMov$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;

  constructor(private localService: LocalService, private movimientoService: MovimientoService) { }

  ngOnInit() {

    this.lista$ = this.localService.traerMovLocales('18R76fhkGQ4ybmXVGXp1');
 
    this.columnasTabla = [
      'producto',
      'usuario',
      'local',
      'tipo',
      'cantidad'
    ];
    console.log(this.lista$);
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });

  }

}
