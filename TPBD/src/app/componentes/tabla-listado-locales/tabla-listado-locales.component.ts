import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { LocalService } from 'src/app/servicios/local.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-tabla-listado-locales',
  templateUrl: './tabla-listado-locales.component.html',
  styleUrls: ['./tabla-listado-locales.component.css'],
  animations: [
    trigger('expandirDetalle', [
      state('colapsar', style({ height: '0px', minHeight: '0' })),
      state('expandir', style({ height: '*' })),
      transition('expandir <=> colapsar', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class TablaListadoLocalesComponent implements OnInit {

  @Input() rol:string;
   lista$: Observable<any[]>;
   columnasTabla: string[];
   datosTabla: MatTableDataSource<any>;
   localExpandido: ['movimientos/${id}/tipo', 'description', 'observaciones'] | null;

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

habilitarLocal(id: string){
  this.localService.habilitarLocal(id);
}
}
