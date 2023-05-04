import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  collectionName = 'money-track';
  constructor(private firestore: AngularFirestore) {}

  get_transactions() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  add_transaction(data: any) {
    return this.firestore.collection(this.collectionName).add(data);
  }
  delete_transaction(id: any) {
    return this.firestore.doc(this.collectionName + '/' + id).delete();
  }
  get_single_transactions(id: any) {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges();
  }
  update_transaction(id: any, data: any) {
    return this.firestore.doc(this.collectionName + '/' + id).update(data);
  }
}
