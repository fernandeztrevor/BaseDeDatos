import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { UsuarioInt } from 'src/app/interfaces/usuario-int';

@Component({
  selector: 'app-listado-mov-usuarios',
  templateUrl: './listado-mov-usuarios.component.html',
  styleUrls: ['./listado-mov-usuarios.component.css']
})
export class ListadoMovUsuariosComponent implements OnInit {
  public lista$: Observable<any[]>;
  public listaMov$: Observable<any[]>;
  columnasTabla: string[];
  datosTabla: MatTableDataSource<any>;


  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.columnasTabla = [
      'producto',
      'usuario',
      'local',
      'tipo',
      'cantidad'
    ];
    this.listaMov$ = this.usuarioService.traerMovUsuarios();

    // this.lista$.subscribe(datos => {
    //   this.datosTabla = new MatTableDataSource(datos);
    // });

    this.usuarioService.traerTodosLosMovsUser();
  }
    
  }



