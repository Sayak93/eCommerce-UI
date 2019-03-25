import { Injectable } from '@angular/core';
import {userModel} from './userModel';
import { HttpClientModule, HttpParams }    from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from './admin/product';
import {User} from './admin/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
} 

@Injectable({
  providedIn: 'root'
})

export class HelperServiceService {
  serviceURL: String = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  signup(data : userModel) : Observable<any>{
    return this.http.post(this.serviceURL+"/signup", data, httpOptions)
  }

  login(data : userModel) : Observable<any>{
    return this.http.post(this.serviceURL+"/login", data, httpOptions)
  }

  getUser(token, id) : Observable<any>{
    return this.http.get(this.serviceURL+"/user", {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    })
  }
  getProducts( token, id) : Observable<any>{
    return this.http.get(this.serviceURL+"/product", {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    })  
  }
  updateUser(data : User,token, id) : Observable<any>{
    return this.http.put(this.serviceURL+"/user", data, {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    }) 
  }
  updateProduct(data : Product,token, id) : Observable<any>{
    return this.http.put(this.serviceURL+"/product", data, {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    })  
  }
  deleteUser(data : User, token, id) : Observable<any>{
    return this.http.delete(this.serviceURL+"/user?_id="+data._id, {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    })  
  }
  deleteProduct(data, token, id) : Observable<any>{
    return this.http.delete(this.serviceURL+"/product?_id="+data._id, {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    })  
  }
  addProduct(data : Product, token, id) : Observable<any>{
    return this.http.post(this.serviceURL+"/product", data,  {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    })
  }

  addUser(data : userModel, token, id) : Observable<any>{
    return this.http.post(this.serviceURL+"/user", data, {
      headers:{'Content-Type':'application/json', 'id':id, 'authorization': token}
    })
  }

}
