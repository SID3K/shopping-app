import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  isLoginMode=true;
  isLoading=false;
  error:string=null;
  close1 = true;

  constructor(private authService:AuthService, private router:Router, private toastService:HotToastService){};

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(authForm:NgForm){
    console.log(authForm.value);
    if(authForm.valid==false){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true;

    let authObs : Observable<AuthResponseData>;

    if(this.isLoginMode){                                  //Login
      authObs = this.authService.login(email,password);
      
    }
    else{                                                  //signup
      authObs = this.authService.signup(email,password);
    }

    authObs.subscribe(
      (response)=>{
        this.isLoading = false;
        console.log(response);
        this.error=null;
        this.router.navigate(['/recipes'])
      },
      (errorRes)=>{
        this.isLoading = false;
        this.error=errorRes;
        console.log(errorRes);
      }
    );

    authForm.reset();
  }

  onHandleError(){
    this.error=null;
  }

  
}
