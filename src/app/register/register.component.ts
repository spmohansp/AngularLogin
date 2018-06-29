import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validator } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from "firebase/app";
import { CanActivate, Router } from "@angular/router";
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginData;
  registerForm:FormGroup;
  registerDatas;

  constructor(public Aauth: AngularFireAuth, public router: Router,public db:AngularFireDatabase) {
    this.Aauth.authState.subscribe((auth) => {
      if (auth == null) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.registerForm=new FormGroup({
      'name':new FormControl(),
      'mobile':new FormControl(),
    });
    this.db.list('register').valueChanges().subscribe((RegisterData)=>{
      this.registerDatas=RegisterData;
    })
  }
  logout() {
    this.Aauth.auth.signOut();
    this.router.navigate(['/']);
    this.loginData = false;
  }
  submitData(){
    this.db.list('register').push(this.registerForm.getRawValue()).then(()=>{
      this.router.navigate(['/register']);
    })
  }

}
