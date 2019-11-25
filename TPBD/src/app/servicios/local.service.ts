import { Injectable } from '@angular/core';
import { LocalInt } from '../interfaces/local-Int';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  locales: AngularFirestoreCollection;

  constructor(private angularFirestore: AngularFirestore) {
    this.locales = this.angularFirestore.collection<LocalInt>('locales');
  }

  persistirLocal(local: LocalInt) {
    this.locales.add(local);
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
