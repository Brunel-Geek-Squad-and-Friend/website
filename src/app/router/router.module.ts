import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../pages/home/home.component';
import {StreamComponent} from '../pages/stream/stream.component';
import {StartComponent} from '../pages/start/start.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stream', component: StreamComponent },
  { path: 'start', component: StartComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
