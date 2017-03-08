import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {MetaData} from "./meta-data";

declare var firebase:any;

@Injectable()
export class AuthService {

  constructor() { }

  signupUser(email:any, password:any) : Observable<MetaData>{
    const subject = new Subject<MetaData>();
    console.log(email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      subject.next(new MetaData('error', error.code, error.message));
    })
      .then(function (user) {
        if(user){
          console.log(user);
          subject.next(new MetaData('success', 'Create-Success', 'User created successfully'))
        }
      });
    return subject.asObservable();
  }

  signinUser(email:any, password:any): Observable<MetaData>{
    const subject = new Subject<MetaData>();
    console.log(email,password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      subject.next(new MetaData('error', error.code, error.message));
    })
      .then(function (user) {
        console.log(user);
        if(user)
          subject.next(new MetaData('success', 'Auth-Success', 'Login was Successful'));
      });
    return subject.asObservable();
  }

  signOutUser(){
    firebase.auth().signOut().
      then(function () {
      console.log("Signed Out");
    });
  }

  isAuthenticated(): Observable<boolean>{
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function (user) {
      if(user){
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
  }

  getCurrentUser(){
    return firebase.auth().currentUser;
  }

}
