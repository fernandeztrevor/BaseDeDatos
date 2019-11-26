import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import { Usuario } from '../clases/usuario';
import { UsuarioService } from './usuario.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioInt } from '../interfaces/usuario-int';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario$: Observable<UsuarioInt>;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private userService: UsuarioService,
    private router: Router
  ) {
    this.usuario$ = this.buscarUsuarioFirebase();
  }

  async registracion(
    usuario: UsuarioInt,
    //email: string,
    password: string,
    foto: Array<File>
  ): Promise<string> {
    let salida = 'Usuario dado de alta';

    try {
      const res = await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        usuario.email,
        password,        
      );
      usuario.id = res.user.uid;
      this.userService.persistirUsuario(usuario, res.user.uid);
      if (!(foto === undefined)) {
        this.userService.subirFoto(foto[0], res.user.uid);
      }
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async ingresar(email: string, password: string): Promise<string> {
    let salida = 'El usuario ingreso correctamente';

    try {
      const res = await this.angularFireAuth.auth.signInWithEmailAndPassword(
        email,
        password

      );
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async ingresarAnonimo(): Promise<string> {
    let salida = 'El usuario anonimo ingreso correctamente';

    try {
      const res = await this.angularFireAuth.auth.signInAnonymously();
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  async salir(): Promise<string> {
    let salida = 'El usuario salio correctamente';
    try {
      const res = await this.angularFireAuth.auth.signOut();
      this.router.navigate(['/login']);
    } catch (err) {
      salida = err.message;
    }

    return salida;
  }

  private buscarUsuarioFirebase(): Observable<UsuarioInt> {
    const salida = this.angularFireAuth.authState.pipe(
      switchMap(usuario => {
        if (usuario) {
          return this.angularFireStore
            .doc<UsuarioInt>(`usuarios/${usuario.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
    return salida;
  }

  traerUsuarioActivo(): Observable<UsuarioInt> {
    return this.usuario$;
  }

}
