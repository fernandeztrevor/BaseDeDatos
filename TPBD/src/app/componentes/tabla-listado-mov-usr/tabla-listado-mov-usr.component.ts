import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabla-listado-mov-usr',
  templateUrl: './tabla-listado-mov-usr.component.html',
  styleUrls: ['./tabla-listado-mov-usr.component.css']
})
export class TablaListadoMovUsrComponent implements OnInit {

  @Input() rol:string;
  listaMovUsr: Observable<any[]>;

  constructor() { 
    this.listaMovUsr = null;
  }

  ngOnInit() {
  }

  cambioUsuario(listaMovUsr){
    this.listaMovUsr = listaMovUsr;
  }

}
