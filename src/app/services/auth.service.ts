import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import { User } from '@firebase/auth-types';

@Injectable()
export class AuthService {

  public authState: Observable<User | null>;

  constructor(private afa: AngularFireAuth) {
    this.authState = afa.authState;
  }

  public authAnonymous(): Promise<boolean> {
    return this.afa.auth.signInAnonymously()
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }

}
