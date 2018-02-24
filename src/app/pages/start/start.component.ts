import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs/Observable';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  public authState$: Observable<User | null>;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.authAnonymous();
    this.authState$ = this.auth.authState;
  }

}
