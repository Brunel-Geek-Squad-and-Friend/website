import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StreamComponent } from './pages/stream/stream.component';
import { AppRouterModule } from './router/router.module';
import { StartComponent } from './pages/start/start.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StreamComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRouterModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
