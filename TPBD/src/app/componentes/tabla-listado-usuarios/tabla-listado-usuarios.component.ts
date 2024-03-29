import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tabla-listado-usuarios',
  templateUrl: './tabla-listado-usuarios.component.html',
  styleUrls: ['./tabla-listado-usuarios.component.css']
})
export class TablaListadoUsuariosComponent implements OnInit {
  @Input() rol: string;

  lista$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;  
  @Output() listaMov: EventEmitter<Observable<any[]>>;
  listaMovimientos$: Observable<any[]>;
  nombreUsuario: string;

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
        'email',
        'activo',
        'rol',
        'local',
        'id', 
        'movimientos'
        
      ]
    } else {
      this.columnasTabla = [
        'nombre',
        'apellido',
        'email',
        'activo',
        'rol',
        'local', 
        'movimientos'
      ];
    }
    this.lista$.subscribe(datos => {
      this.datosTabla = new MatTableDataSource(datos);
    });

    this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
      this.nombreUsuario =  usuarioAct.nombre;
      });
  }

  deshabilitarUsuario(id: string) {
    this.usuarioService.deshabilitarUsuario(id);
  }

  habilitarUsuario(id: string) {
    this.usuarioService.habilitarUsuario(id);
  }

  mostrarMovimientos(id: string) {

    this.listaMovimientos$ = this.usuarioService.traerMovUsuarios(id);
    this.listaMov.emit(this.listaMovimientos$);
    //console.log(this.localUsuario);

  }

  public doFilter = (value: string) => {
    this.datosTabla.filter = value.trim().toLocaleLowerCase();
  }

}
