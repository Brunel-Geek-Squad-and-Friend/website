import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AngularFirestoreCollection} from 'angularfire2/firestore/collection/collection';

interface User {
  id: string;
  name: string;
}

@Injectable()
export class QueueService {

  private collection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.collection = this.afs.collection('/queue');
  }

  get(): Observable<any> {
    return this.collection.valueChanges();
  }

  join(user: User): void {
    const data = {
      id: user.id,
      name: user.name,
      joined: new Date().toUTCString()
    };
    console.log(data);
    const document = this.collection.doc(user.id);
    document.set(data);
  }

}
