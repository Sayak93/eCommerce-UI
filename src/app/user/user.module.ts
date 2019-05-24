import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRoutingModule } from './user.route';

@NgModule({
  imports: [
    CommonModule, UserRoutingModule
  ],
  declarations: [DashboardComponent]
})
export class UserModule { }
