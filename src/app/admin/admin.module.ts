import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminRoutingModule } from './admin.route';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule, AdminRoutingModule,FormsModule,ReactiveFormsModule
  ],
  declarations: [ProductDashboardComponent, UserDashboardComponent, NavbarComponent, DashboardComponent]
})
export class AdminModule { }
