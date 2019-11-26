import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInt } from 'src/app/interfaces/usuario-int';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.css']
})
export class BarraHerramientasComponent implements OnInit {
  foto: string;
  rol: string;
  nombreApellido: string;
  tipoBoton: string;
  usuario$: Observable<UsuarioInt>;

  constructor(private authService: AuthService) {
    this.usuario$ = authService.traerUsuarioActivo();
    this.tipoBoton = 'ninguno';
    this.usuario$.subscribe(usuario => {
      this.foto = usuario.foto;
      this.rol = usuario.rol;
      this.nombreApellido = usuario.nombre + ' ' + usuario.apellido;
    });
  }

  ngOnInit() {
  }


  cerrarSesion(){
    this.authService.salir();
  }

  asignarTipoBoton(tipo: string){
    this.tipoBoton = tipo;
  }
}
