import { Injectable } from '@angular/core';
import { ProductoInt } from '../interfaces/producto-Int';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MovimientoService } from './movimiento.service';
import { TipoMovimiento } from '../enums/tipo-movimiento.enum';
import { LocalService } from './local.service';
import { MovimientoInt } from '../interfaces/movimiento-int';
import { AuthService } from './auth.service';
import { Producto } from '../clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: AngularFirestoreCollection;
  movimientos: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage,
    private movimientoService: MovimientoService, private localService: LocalService, private authService: AuthService) {
    this.productos = this.angularFirestore.collection<ProductoInt>('productos');
    this.movimientos = this.angularFirestore.collection<MovimientoInt>('productos/Hus5XGSjoXJCd7IuMJtc/movimientos');
  }

  persistirProducto(producto: ProductoInt, foto?: Array<File>) {

    this.productos.add(producto).then(doc => {
      this.productos.doc(doc.id).update({ id: doc.id });

      if (foto) {
        this.subirFoto(foto[0], doc.id);
      }
      this.localService.traerLocales().subscribe(locales => {
        locales.forEach(localFE => {
          let email = '';
          this.authService.traerUsuarioActivo().subscribe(usuarioAct => {
            email = usuarioAct.email;
          });
          const movimientosTmp = {
            tipo: TipoMovimiento.agregar,
            usuario: email,
            producto: producto.nombre,
            local: localFE,
            cantidad: 0
          }
          this.movimientoService.persistirMovimiento(movimientosTmp, doc.id, "productos");
        });
      });
    });
  }

  deshabilitarProducto(uid: string) {
    this.productos.doc(uid).update({ activo: false });
  }

  habilitarProducto(uid: string) {
    this.productos.doc(uid).update({ activo: true });
  }

  traerProductos(): Observable<any[]> {
    return this.productos.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const datos = action.payload.doc.data() as ProductoInt;
          const id = action.payload.doc.id;
          return { id, ...datos };
        });
      })
    );
  }

  traerMovProductos(): Observable<any[]> {
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

  traerTodosLosMovsProd() {
    // this.movimientos = this.angularFirestore.collection<ProductoInt>('productos/${uid}/movimientos');

    this.traerProductos().subscribe(prods => {
      prods.forEach(unProd => {
        this.movimientos = this.angularFirestore.collection<MovimientoInt>(`productos/${unProd.id}/movimientos`);

        this.traerMovProductos().subscribe(movimient => {

          movimient.forEach(movFE => {
            movFE;
            console.log(movFE);
          });
        });
      });
    })

  }

  subirFoto(foto: File, uid: string) {
    const pathFoto = `imagenesProductos/${uid}`;
    const tarea = this.angularFireStorage.upload(pathFoto, foto);

    tarea.then(() => {
      this.angularFireStorage
        .ref(pathFoto)
        .getDownloadURL()
      // .subscribe(url => {
      //   this.productos.doc(uid).update({
      //   foto: url
      //   });

      // });
    });

  }
}
