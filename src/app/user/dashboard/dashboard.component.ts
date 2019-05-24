import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import {HelperServiceService} from '../../helper-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bought:Product[] = []
  product : Product[]
  selectedProduct : Product
  token : String;
  id : String;

  constructor(private helper : HelperServiceService, private router : Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token')
    this.id = localStorage.getItem('id')
    this.getProducts() 
  }
  buy(data){
    this.bought.push(data)
  }
  select(data){
    this.selectedProduct=data
  }
  remove(itemToRemove){
    this.bought = this.bought.filter(obj=>obj !== itemToRemove)
  }
  getProducts(){
    this.helper.getProducts(this.token, this.id).subscribe(data=>{
      if(data.message=="ok"){
        console.log(data);
        this.product = data.data
      }
      else{
        alert("Failedto get products")
      }
    })
  }
  onLogout(){
    this.router.navigate(['/'])
    localStorage.clear()
  }

}
