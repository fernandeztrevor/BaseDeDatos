import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabla-listado-mov-prod',
  templateUrl: './tabla-listado-mov-prod.component.html',
  styleUrls: ['./tabla-listado-mov-prod.component.css']
})
export class TablaListadoMovProdComponent implements OnInit {
  @Input() rol:string;
  listaMovProd: Observable<any[]>;

  constructor() {
    this.listaMovProd = null;
   }

  ngOnInit() {
  }

  cambioProducto(listaMovProd){
    this.listaMovProd = listaMovProd;
  }

}
