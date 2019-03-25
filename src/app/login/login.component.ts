import { Component, OnInit } from '@angular/core';
import {userModel} from '../userModel';
import {HelperServiceService} from '../helper-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isClicked : Boolean;
  submitButtonVal : String;
  userModel = new userModel();
  emailValidation : Boolean;
  passwordValidation : Boolean;
  nameValidation : Boolean;
  roleValidation : Boolean;
  
  constructor(private helper : HelperServiceService, private router: Router) { }

  ngOnInit() {
    this.isClicked = false;
    this.submitButtonVal = "Login";
  }

  register(){
    this.isClicked = true;
    this.submitButtonVal = "Register"
  }

  handleLoginForm(){
    if(this.isClicked){
      //do register
      console.log(this.userModel)
      this.helper.signup(this.userModel).subscribe(data =>{
        console.log(data)
        if(data.message=="ok"){
          localStorage.setItem('token',data.token)
          localStorage.setItem('id',data.id)
          this.router.navigate([data.role]);
        }
      });
    }else{
      //do login
      console.log(this.userModel);
      this.helper.login(this.userModel).subscribe(data=>{
        console.log(data)
        if(data.message=="ok"){
          localStorage.setItem('token',data.token)
          localStorage.setItem('id',data.id)
          this.router.navigate([data.role]);
        }
      });
    }
  }

}
