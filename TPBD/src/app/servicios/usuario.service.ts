import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Usuario } from '../clases/usuario';
import { UsuarioInt } from '../interfaces/usuario-int';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { Observable, of } from 'rxjs';
//import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //usuario$: Observable<any>;
  usuarios: AngularFirestoreCollection;

  constructor(
    private angularFireStore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
    //private angularFireAuth: AngularFireAuth
  ) {
    //this.usuario$ = this.buscarUsuarioFirebase();
  }

  /*persistirUsuario(usuario: Usuario, uid: string) {
    this.angularFireStore
      .collection('/usuarios')
      .doc(uid)
      .set(Object.assign({}, JSON.parse(JSON.stringify(usuario))));
  }*/

  persistirUsuario(usuario:UsuarioInt, uid: string){
    //this.angularFireStore.collection('/usuarios').add(Object.assign({}, JSON.parse(JSON.stringify(usuario))));
    this.usuarios.doc(uid).set(usuario);
  }

  /*private buscarUsuarioFirebase(): Observable<any> {
    const salida = this.angularFireAuth.authState.pipe(
      switchMap(usuario => {
        if (usuario) {
          return this.angularFireStore
            .doc<any>(`usuarios/${usuario.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      }),
      map(usuario => {
        if (usuario) {
          switch (usuario.rol) {
            case 'cliente':
              return usuario as Observable<Cliente>;
            case 'supervisor':
              return usuario as Observable<Supervisor>;
            case 'empleado':
              return usuario as Observable<Empleado>;
          }
        }
      })
    );
    return salida;
  }

  traerUsuarioActivo(): Observable<any> {
    return this.usuario$;
  }*/
  subirFoto(foto: File, uid: string) {
    const pathFoto = `imagenes/${uid}`;
    const tarea = this.angularFireStorage.upload(pathFoto, foto);
    tarea.then(() => {
      this.angularFireStorage
        .ref(pathFoto)
        .getDownloadURL()
        .subscribe(url => {
          this.usuarios.doc(uid).update({
            foto: url
          });
        });
    });
  }
}
