import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { LocalService } from 'src/app/servicios/local.service';

@Component({
  selector: 'app-tabla-listado-locales',
  templateUrl: './tabla-listado-locales.component.html',
  styleUrls: ['./tabla-listado-locales.component.css']
})
export class TablaListadoLocalesComponent implements OnInit {

  @Input() rol:string;
   lista$: Observable<any[]>;
   columnasTabla: string[];
   datosTabla: MatTableDataSource<any>;

  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.lista$ = this.localService.traerLocales();
    if(this.rol === 'Administrador'){
      this.columnasTabla = [ 'nombre', 'direccion', 'activo', 'id'];
    }else{
      this.columnasTabla = [ 'nombre', 'direccion', 'activo'];
    }

    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });
  }

  deshabilitarLocal(id: string){
    this.localService.deshabilitarLocal(id);
}
}
