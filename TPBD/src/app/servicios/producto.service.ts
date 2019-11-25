import { Injectable } from '@angular/core';
import { ProductoInt } from '../interfaces/producto-Int';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore) { 
    this.productos = this.angularFirestore.collection<ProductoInt>('productos');
  }

  persistirProducto(producto: ProductoInt){
    this.productos.add(producto);
  }

  deshabilitarProducto(uid: string){
    this.productos.doc(uid).update({activo: false});
  }

  traerProductos(): Observable<any[]>{
    return this.productos.snapshotChanges().pipe(
      map(actions => {
        return actions.map( action => {
          const datos = action.payload.doc.data() as ProductoInt;
          const id = action.payload.doc.id;
          return { id, ...datos};
        });
      })
    );
  }
}
