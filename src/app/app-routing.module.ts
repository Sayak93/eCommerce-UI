import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path : 'login', component : LoginComponent},
  {path : 'admin', loadChildren : './admin/admin.module#AdminModule'},
  {path : 'user', loadChildren : './user/user.module#UserModule'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
