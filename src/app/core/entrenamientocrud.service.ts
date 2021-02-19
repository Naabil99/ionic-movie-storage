import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntrenamientocrudService {

  constructor(private firestore: AngularFirestore) { }
  
  create_Entrenamiento(record) {
    return this.firestore.collection('entrenamientos').add(record);
    }
    read_Entrenamientos() {
    return this.firestore.collection('entrenamientos').snapshotChanges();
    }
    update_Entrenamiento(recordID, record) {
    this.firestore.doc('entrenamientos/' + recordID).update(record);
    }
    delete_Entrenamiento(record_id) {
    this.firestore.doc('entrenamientos/' + record_id).delete();
    }
    }
