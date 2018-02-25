import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../pages/home/home.component';
import {StreamComponent} from '../pages/stream/stream.component';
import {StartComponent} from '../pages/start/start.component';
import {EndComponent} from '../pages/end/end.component';
import {WhoComponent} from '../pages/who/who.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'stream', component: StreamComponent },
  { path: 'start', component: StartComponent },
  { path: 'end', component: EndComponent},
  { path: 'who', component: WhoComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
