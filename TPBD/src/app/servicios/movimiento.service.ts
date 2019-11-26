import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { MovimientoInt } from '../interfaces/movimiento-int';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  movimientos: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore) {
    //this.movimientos = this.angularFirestore.collection<MovimientoInt>('movimientos');
  }

  persistirMovimiento(movimiento: MovimientoInt, id: string, tipo: string) {
    const path = `${tipo}/${id}/movimientos`;
    console.log(path);
    this.movimientos = this.angularFirestore.collection<MovimientoInt>(path);

    this.movimientos.add(movimiento);
  }

  traerMovimientos(): Observable<any[]> {
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
}
