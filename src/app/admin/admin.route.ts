import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : '', component : DashboardComponent},
  {path : 'product', component : ProductDashboardComponent},
  {path : 'user', component : UserDashboardComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports : [RouterModule]
})
export class AdminRoutingModule { }
