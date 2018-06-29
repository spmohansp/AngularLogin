import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase/app";
import { CanActivate, Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData=false;
  constructor(public Aauth:AngularFireAuth,public router:Router) { }

  ngOnInit() {
    this.Aauth.authState.subscribe((auth) => {
      if(auth!=null){
        this.loginData=true;
      }
  });
  }
  GoogleLogin(){
    this.Aauth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((user)=>{
      console.log(user);
      this.router.navigate(['/register']);
    })
  }
  FacebookLogin(){
    this.Aauth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((user)=>{
      console.log(user);
      this.router.navigate(['/register']);
    })
  }
}
