import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';


import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StreamComponent } from './pages/stream/stream.component';
import { AppRouterModule } from './router/router.module';
import { StartComponent } from './pages/start/start.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule} from 'angularfire2/auth';
import {  AngularFirestoreModule} from 'angularfire2/firestore';
import { QueueService } from './services/queue.service';
import { EndComponent } from './pages/end/end.component';
import { WhoComponent } from './pages/who/who.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreamComponent,
    StartComponent,
    EndComponent,
    WhoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SocketIoModule.forRoot(environment.socketIo)
  ],
  providers: [AuthService, QueueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
