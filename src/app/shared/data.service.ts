import {Injectable, EventEmitter} from '@angular/core';
import {Curator} from "./curator";
import {Subject, Observable} from "rxjs";
import {AuthService} from "./auth.service";

declare var firebase;

@Injectable()
export class DataService {

  curator:Curator;
  getCurator = new EventEmitter<Curator>();
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

  getUserDataOffline(){
    if(!this.curator)
    {
      this.getUserData().subscribe(
        (curator:Curator) => {
          this.curator = curator;
          this.getCurator.emit(this.curator);
        }
      );
    }
    return this.curator;
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

}
