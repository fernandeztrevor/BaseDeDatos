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


  constructor() { }

  ngOnInit() {
    
  }

}
