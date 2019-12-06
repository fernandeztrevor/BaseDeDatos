import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { LocalService } from 'src/app/servicios/local.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

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

  @Input() rol: string;
  @Output() listaMov: EventEmitter<Observable<any[]>>;
  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;
  localExpandido: ['movimientos/${id}/tipo', 'description', 'observaciones'] | null;
  idSeleccionado: string;
  listaMovimientos$: Observable<any[]>;
  localUsuario: string;

  constructor(private localService: LocalService, private router: Router, private authService: AuthService) {
    this.listaMov = new EventEmitter<Observable<any[]>>();
  }

  ngOnInit() {
    this.lista$ = this.localService.traerLocales();
    if (this.rol === 'Administrador') {
      this.columnasTabla = ['nombre', 'direccion', 'activo', 'id', 'movimientos'];
    } else {
      this.columnasTabla = ['nombre', 'direccion', 'activo', 'movimientos'];
    }

    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });

    this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
      this.localUsuario =  usuarioAct.local;
      });
  }

  deshabilitarLocal(id: string) {
    this.localService.deshabilitarLocal(id);
  }

  habilitarLocal(id: string) {
    this.localService.habilitarLocal(id);
  }

  mostrarMovimientos(id: string) {

    this.listaMovimientos$ = this.localService.traerMovLocales(id);
    this.listaMov.emit(this.listaMovimientos$);
    console.log(this.localUsuario);

  }


}
