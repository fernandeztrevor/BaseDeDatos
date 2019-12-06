import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabla-listado-mov-loc',
  templateUrl: './tabla-listado-mov-loc.component.html',
  styleUrls: ['./tabla-listado-mov-loc.component.css']
})
export class TablaListadoMovLocComponent implements OnInit {

  @Input() rol:string;
  listaMovLoc: Observable<any[]>;
  
  constructor() { 
    this.listaMovLoc = null;
  }

  ngOnInit() {
  }

  cambioLocal(listaMovLoc){
    this.listaMovLoc = listaMovLoc;
  }

}
