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
import { MovimientoInt } from '../interfaces/movimiento-int';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  locales: AngularFirestoreCollection;
  usuario: UsuarioInt;
  movimientos: AngularFirestoreCollection;
  idSeleccionado: string;

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService,
    private movimientoService: MovimientoService, private usuarioService: UsuarioService, angularFireAuth: AngularFireAuth) {
    this.locales = this.angularFirestore.collection<LocalInt>('locales');
    this.movimientos = this.angularFirestore.collection<MovimientoInt>('locales/Hus5XGSjoXJCd7IuMJtc/movimientos');
  }

  persistirLocal(local: LocalInt) {
    this.locales.add(local).then(doc => {
      this.locales.doc(doc.id).update({ id: doc.id });


      //this.traerLocales().subscribe(locales => {
      let email = '';
      this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
        email = usuarioAct.email;

        const movimientosTmp = {
          tipo: TipoMovimiento.agregar,
          usuario: email,
          producto: "-",
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

  habilitarLocal(uid: string) {
    this.locales.doc(uid).update({ activo: true });
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

  traerMovLocales(id:string): Observable<any[]> {

    this.movimientos = this.angularFirestore.collection<MovimientoInt>(`locales/${id}/movimientos`);
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
  

  traerTodosLosMovsLoc() {
    // this.movimientos = this.angularFirestore.collection<ProductoInt>('productos/${uid}/movimientos');
      
      
    
    //  return this.locales.snapshotChanges().pipe(
    //    map(actions => {
    //      return actions.map(action => {
    //        const datos = action.payload.doc.data() as LocalInt;
    //        const id = action.payload.doc.id;
    //        this.movimientos = this.angularFirestore.collection<MovimientoInt>(`locales/${id}/movimientos`);

    //        return this.traerMovLocales();
    //      });
    //    })
    //  );
    
    
    
    //    this.traerLocales().subscribe(locs => {
    //    locs.forEach(unLoc => {
    //      this.movimientos = this.angularFirestore.collection<MovimientoInt>(`locales/${unLoc.id}/movimientos`);
    //      this.traerMovLocales().subscribe(movimient => {
    //        movimient.forEach(movFE => {
    //          movFE;
             
    //          console.log(movFE);
    //        });
    //      });
    //    });
    //  });


  }

  // traerIdLocal(local: string): string {
  //   //let locales:Observable<any[]>;
  //   let idLocal: string;

  //   //locales=this.traerLocales();

  //   this.traerLocales().subscribe(locales => {
  //     locales.forEach(localFE => {

  //       if (localFE.nombre == local) {
  //         idLocal = localFE.id;
  //       }
  //       //console.log("adentro:"+idLocal);
  //       //return idLocal;
  //     });
  //     console.log("ultimo:"+idLocal);
  //     return idLocal;
  //   });

  //   //return idLocal;
  // }

  
}
