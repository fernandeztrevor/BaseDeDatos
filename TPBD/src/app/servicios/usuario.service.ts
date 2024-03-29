import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
//import { Usuario } from '../clases/usuario';
import { UsuarioInt } from '../interfaces/usuario-int';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoMovimiento } from '../enums/tipo-movimiento.enum';
import { MovimientoService } from './movimiento.service';
import { LocalService } from './local.service';
import { AuthService } from './auth.service';
import { MovimientoInt } from '../interfaces/movimiento-int';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //usuario$: Observable<any>;
  usuarios: AngularFirestoreCollection;
  movimientos: AngularFirestoreCollection;
  idSeleccionado: string;
  usuario: UsuarioInt;

  constructor(

    private angularFireStore: AngularFirestore,
    private movimientoService: MovimientoService,
    private angularFireStorage: AngularFireStorage,
    //private localService: LocalService,
    //private authService: AuthService,
    //private angularFireAuth: AngularFireAuth
  ) {
    this.usuarios = this.angularFireStore.collection<UsuarioInt>('usuarios');
    this.movimientos = this.angularFireStore.collection<MovimientoInt>('usuarios/Hus5XGSjoXJCd7IuMJtc/movimientos');
    //this.usuario$ = this.buscarUsuarioFirebase();
  }

  /*persistirUsuario(usuario: Usuario, uid: string) {
    this.angularFireStore
      .collection('/usuarios')
      .doc(uid)
      .set(Object.assign({}, JSON.parse(JSON.stringify(usuario))));
  }*/

  persistirUsuario(usuario: UsuarioInt, uid: string, idLocal: string) {
    this.usuarios.doc(uid).set(usuario);

    const movimientosTmp = {
      tipo: TipoMovimiento.crear,
      usuario: usuario.email
    }
    //let localId: string;

    // this.localService.traerLocales().subscribe(locales => {
    //   locales.forEach(localFE => {
    //     if (localFE.nombre == usuario.local) {
    //       localId = localFE.id;
    //     }
    // });
    this.movimientoService.persistirMovimiento(movimientosTmp, idLocal, "locales");
    //  });
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

  deshabilitarUsuario(uid: string) {
    this.usuarios.doc(uid).update({ activo: false });
  }

  habilitarUsuario(uid: string) {
    this.usuarios.doc(uid).update({ activo: true });
  }

  traerUsuarios(): Observable<any[]> {
    return this.usuarios.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const datos = action.payload.doc.data() as UsuarioInt;
        const id = action.payload.doc.id;
        return { id, ...datos };
      });
    }));
  }

  traerMovUsuarios(id: string): Observable<any[]> {

    this.movimientos = this.angularFireStore.collection<MovimientoInt>(`usuarios/${id}/movimientos`);
    return this.movimientos.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as MovimientoInt;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }

  //   traerTodosLosMovsUser(){
  //    // this.movimientos = this.angularFirestore.collection<ProductoInt>('productos/${uid}/movimientos');

  //    this.traerUsuarios().subscribe(prods=>{
  //        prods.forEach(unProd => {
  //          this.movimientos = this.angularFireStore.collection<MovimientoInt>(`usuarios/${unProd.id}/movimientos`);

  //          this.traerMovUsuarios().subscribe(movimient => {

  //            movimient.forEach(movFE => {
  //              movFE;
  //             console.log(movFE);
  //           });
  //           });
  //       });
  //     })

  // }
}
