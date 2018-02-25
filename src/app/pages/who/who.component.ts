import { Component, OnInit } from '@angular/core';
import {QueueService} from '../../services/queue.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-who',
  templateUrl: './who.component.html',
  styleUrls: ['./who.component.css']
})
export class WhoComponent implements OnInit {

  queue$: Observable<any>;

  constructor(
    private queueService: QueueService,
  ) { }

  ngOnInit() {
    this.retrieveQueue();
  }

  private retrieveQueue() {
    this.queue$ = this.queueService.get()
      .pipe(
        map(this.orderQueue)
      );
  }

  private orderQueue(queue: any) {
    return queue.sort((a, b) => {
      const dateA = new Date(a.joined), dateB = new Date(b.joined);
      return dateA > dateB;
    });
  }

}
