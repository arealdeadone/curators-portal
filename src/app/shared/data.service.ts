import { Injectable } from '@angular/core';
import {Curator} from "./curator";
import {Subject, Observable} from "rxjs";
import {AuthService} from "./auth.service";

declare var firebase;

@Injectable()
export class DataService {

  constructor(private authService:AuthService){ }

  storeUserData(curatorData:Curator): Observable<boolean> {
    const currentUser = this.authService.getCurrentUser();
    const subject = new Subject<boolean>();
    firebase.database().ref('curators/'+currentUser.uid).set(curatorData)
      .catch(function (err) {
        console.log(err);
        subject.next(false);
      })
      .then(function () {
        subject.next(true);
      });
    return subject.asObservable();
  }

  getUserData() :  Observable<Curator>{
    const user = this.authService.getCurrentUser();
    let subject = new Subject<Curator>();
    if(user)
    {
      firebase.database().ref('curators/'+user.uid)
        .once('value')
        .then(function (snapshot) {
          subject.next(snapshot.val());
        });
    }
    return subject.asObservable();
  }
  getUniqueKey(refChild){
    const newKey = firebase.database().ref().child(refChild).push().key;
    return newKey;
  }

  createCuration(data:any) : Observable<boolean>{
    const subject = new Subject<boolean>();
    firebase.database().ref().update(data)
      .catch(function (err) {
        console.log(err);
        subject.next(false);
      })
      .then(function () {
        subject.next(true);
      });
    return subject.asObservable();
  }

  updateProductImageList(url:string, id:string) : Observable<boolean>{
    let subject = new Subject<boolean>();
    firebase.database().ref('/curations/'+id+'/productImages').push(url);
    firebase.database().ref('/curators/'+this.authService.getCurrentUser().uid+'/curations/'+id+'/productImages').push(url)
      .catch(function (err) {
        console.log(err);
        subject.next(false);
      })
      .then(function () {
        subject.next(true);
      });
    return subject.asObservable();
  }

}
