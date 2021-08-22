import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RegistroCanariosInterface } from '../interface/registro-canarios';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistroCanariosService {

  constructor(private firestore: AngularFirestore) { }

  //obtiene los canarios por usuario y la coleccion canario
  newGetAllCanarios(usuario: string | null): Observable<RegistroCanariosInterface[]> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString()).
      collection('Canarios').snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as RegistroCanariosInterface;
            const id = a.payload.doc.id;
            return { ...data, id };
          }
          )
        )
      );
  }
  //crea un nuevo registro con un id usuario en la coleccion canarios
  createregisterBird(canario: RegistroCanariosInterface): Promise<any> {
    return this.firestore.collection('registro-canarios').doc(canario.usuario?.toString()).collection('Canarios').add(canario);
  
  }
  //elimino registro dentro de la coleccion canarios del usuario
  deleteCanario(canario: RegistroCanariosInterface): Promise<any> {
    return this.firestore.collection('registro-canarios').doc(canario.usuario?.toString()).
      collection('Canarios').doc(canario.id).delete();
  }
  //edito el registro
  newEditCanario(canario: RegistroCanariosInterface): Promise<any> {
    return this.firestore.collection('registro-canarios').doc(canario.usuario?.toString()).
      collection('Canarios').doc(canario.id).update(canario);
  }


}
