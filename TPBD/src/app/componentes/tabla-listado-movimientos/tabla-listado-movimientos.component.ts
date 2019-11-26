import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-listado-movimientos',
  templateUrl: './tabla-listado-movimientos.component.html',
  styleUrls: ['./tabla-listado-movimientos.component.css']
})
export class TablaListadoMovimientosComponent implements OnInit {

  @Input() rol:string;
  @Input() tipo:string;

  constructor() { }

  ngOnInit() {
  }

}
