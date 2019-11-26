import { Injectable } from '@angular/core';
import { LocalInt } from '../interfaces/local-Int';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoMovimiento } from '../enums/tipo-movimiento.enum';
import { AuthService } from './auth.service';
import { MovimientoService } from './movimiento.service';
import { UsuarioInt } from '../interfaces/usuario-int';
import { UsuarioService } from './usuario.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  locales: AngularFirestoreCollection;
  usuario: UsuarioInt;

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService,
     private movimientoService: MovimientoService, private usuarioService: UsuarioService, angularFireAuth: AngularFireAuth) {
    this.locales = this.angularFirestore.collection<LocalInt>('locales');
  }

  persistirLocal(local: LocalInt) {
    this.locales.add(local).then(doc => {
      this.locales.doc(doc.id).update({id: doc.id}); 
    
    
    //this.traerLocales().subscribe(locales => {
    let email = '';
    this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
      email = usuarioAct.email;

      const movimientosTmp = {
        tipo: TipoMovimiento.agregar,
        usuario: email,
        local: local.nombre
      }
      //this.movimientoService.persistirMovimiento(movimientosTmp);
      this.movimientoService.persistirMovimiento(movimientosTmp, doc.id, "locales");
    });

    });



    // this.traerLocales().subscribe(locales => {
    //   locales.forEach(localFE => {
    //     let email = '';
    //     this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
    //       email = usuarioAct.email;
    //     });
    //     const movimientosTmp = {
    //       tipo: TipoMovimiento.agregar,
    //       usuario: email,
    //       local: local.nombre
    //     }
    //     this.movimientoService.persistirMovimiento(movimientosTmp);
    //   });
    // });
  }


  deshabilitarLocal(uid: string) {
    this.locales.doc(uid).update({ activo: false });
  }

  traerLocales(): Observable<any[]> {
    return this.locales.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as LocalInt;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }
}
