import {Component, HostListener } from '@angular/core';
import {QueueService} from './services/queue.service';
import {AuthService} from './services/auth.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public authState$: Observable<any>;

  constructor(
    private auth: AuthService,
    private queueService: QueueService,
  ) {
    this.auth.authAnonymous()
      .catch((err) => {
      });
    this.authState$ = this.auth.authState;
  }

  @HostListener('window:beforeunload', [])
  beforeunloadHandler() {
    this.delete();
    setTimeout(() => { return false; }, 1500);
  }

  @HostListener('window:unload', [])
  unloadHandler() {
    this.delete();
    setTimeout(() => { return false; }, 1500);
  }

  delete() {
    this.authState$
      .subscribe((authData) => {
        this.queueService.delete(authData.uid);
      });
  }
}
