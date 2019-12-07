import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { LocalService } from 'src/app/servicios/local.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabla-listado-local-usr',
  templateUrl: './tabla-listado-local-usr.component.html',
  styleUrls: ['./tabla-listado-local-usr.component.css']
})
export class TablaListadoLocalUsrComponent implements OnInit {

  @Input() rol: string;

  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;  
  @Output() listaMov: EventEmitter<Observable<any[]>>;
  listaMovimientos$: Observable<any[]>;
  nombreUsuario: string;
  localUsuario: string;

  constructor(private authService: AuthService, 
    private usuarioService: UsuarioService) {
      this.listaMov = new EventEmitter<Observable<any[]>>();
      this.nombreUsuario = this.authService.nombreUsuario;
     }

  ngOnInit() {
    this.lista$ = this.usuarioService.traerUsuarios();
    if (this.rol === 'Administrador') {
      this.columnasTabla = [
        'nombre',
        'apellido',
        'email'
        
      ]
    } else {
      this.columnasTabla = [
        'nombre',
        'apellido',
        'email'
      ];
    }
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });

    this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
      this.nombreUsuario =  usuarioAct.nombre;
      this.localUsuario = usuarioAct.local;

      });
  }

  verificarLocal(local: string): boolean{
    let retorno = null;
    if(local == this.localUsuario || this.nombreUsuario == "Administrador"){
      retorno = true;
    }else{
      retorno = false;
    }


return retorno;
  }

}
