import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Rol } from 'src/app/enums/rol.enum';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  public usuarioForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.usuarioForm = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      foto: new FormControl('')
    });
   }

  ngOnInit() {
  }

  private borrarForm() {
    this.usuarioForm.reset();
  }

  guardarForm() {
    const usuarioTmp = {
      nombre: this.usuarioForm.value.nombre,
      apellido: this.usuarioForm.value.apellido,
      foto: '',
      activo: true,
      rol: Rol.Usuario
    };

    this.authService.registracion(
      usuarioTmp,
      this.usuarioForm.value.email,
      this.usuarioForm.value.password,
      this.usuarioForm.value.foto.files
    );

    this.borrarForm();
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
