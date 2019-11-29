import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/enums/rol.enum';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { LocalInt } from 'src/app/interfaces/local-Int';
import { LocalService } from 'src/app/servicios/local.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;
  public locales:Observable<any[]>;

  constructor(private authService: AuthService, private router: Router, private localService:LocalService) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      foto: new FormControl(''),
      local: new FormControl('')
    });
    this.locales=this.localService.traerLocales();
   }

  ngOnInit() {
    //this.locales = this.localService.traerLocales();
  }

  private borrarForm() {
    this.usuarioForm.reset();
  }

  guardarForm() {
    const usuarioTmp = {
      nombre: this.usuarioForm.value.nombre,
      apellido: this.usuarioForm.value.apellido,
      email: this.usuarioForm.value.email,
      foto: '',
      activo: true,
      rol: Rol.Usuario
    };

    this.authService.registracion(
      usuarioTmp,
      this.usuarioForm.value.password,
      this.usuarioForm.value.foto.files
    );

    //this.borrarForm();
    this.cancelarForm();
  }

  cancelarForm(){
    this.borrarForm();
    this.router.navigate(['/login']);

  }

  /*onUpload(event){
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `imagenes/perfil_${id}`;
    const ref = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(()=> this.urlImage = ref.getDownloadURL()));   
    console.log(ref.getDownloadURL());
  }*/

  //public alta() {
    /*this.activo = true;
    this.rol = 'admin';
    this.foto = 'foto';

    const userTmp = new Usuario(
      this.nombre, this.apellido, this.foto,
      true, this.email, this.rol
    );
    this.userService.persistirUsuario(userTmp);
    this.nombre = "";
    this.apellido = "";
    this.foto = "";
    this.activo = true;
    this.email = "";
    this.rol = "";
    this.password = "";*/
    
    //const task = this.afStorage.upload('imagenes/', this.archivo);
    
  //}
}
