import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs/Observable';
import { User } from '@firebase/auth-types';
import {QueueService} from '../../services/queue.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  public authState$: Observable<User | null>;

  public error: string | null;

  public queue$: Observable<any>;

  public displayName: string;

  public showJoin = false;

  constructor(
    private auth: AuthService,
    private queueService: QueueService
  ) { }

  ngOnInit() {
    this.auth.authAnonymous()
      .catch((err) => {
        this.error = 'Error connecting to Firebase: <br/>' + err;
      });
    this.authState$ = this.auth.authState;
    this.retrieveQueue();
  }

  @HostListener('window:beforeunload', [])
  beforeunloadHandler() {
    this.delete();
    setTimeout(() => { return false; }, 300);
  }

  @HostListener('window:unload', [])
  unloadHandler() {
    this.delete();
    setTimeout(() => { return false; }, 300);
  }

  private retrieveQueue() {
    this.queue$ = this.queueService.get()
      .pipe(
        tap((data) => {
          this.authState$.subscribe((authData) => {
            const authUid: string = authData.uid;
            if (data.filter(obj => obj.id === authUid).length === 0) {
              this.showJoin = true;
            } else {
              this.showJoin = false;
            }
          });
        }),
        map(this.orderQueue)
      );
  }

  private orderQueue(queue: any) {
    return queue.sort((a, b) => {
      const dateA = new Date(a.joined), dateB = new Date(b.joined);
      return dateA > dateB;
    });
  }

  joinQueue() {
    this.authState$
      .subscribe((authData) => {
        const data = {
          id: authData.uid,
          name: this.displayName
        };
        this.queueService.join(data);
      });
  }

  delete() {
    this.authState$
      .subscribe((authData) => {
        this.queueService.delete(authData.uid);
      });
  }
}
