import {Component, OnInit, OnDestroy} from '@angular/core';
import * as firebase from 'firebase';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DataService} from "../../../shared/data.service";
import {AuthService} from "../../../shared/auth.service";
declare var swal;

@Component({
selector: 'cp-upload-images',
templateUrl: './upload-images.component.html',
styleUrls: ['./upload-images.component.css']
})

export class UploadImagesComponent implements OnInit, OnDestroy {

  productImagesProgress; // TODO: Fix the progressbar update
  coverImageProgress;   // TODO: Fix the progressbar update
  ttlfiles;
  curationId;
  curatorId;
  isCbuttonDisabled = false;
  subscription: Subscription;
  constructor(private dataService: DataService, private authService:AuthService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.getUserData();
    const config = {
      apiKey: "AIzaSyCcs4bYrNVSzwWxR7puCL3onX4CcnxYiTo",
      authDomain: "curator-portal.firebaseapp.com",
      databaseURL: "https://curator-portal.firebaseio.com",
      storageBucket: "curator-portal.appspot.com",
      messagingSenderId: "84592978554"
    };
    firebase.initializeApp(config);
    this.productImagesProgress = 0;
    this.ttlfiles = 0;
    this.coverImageProgress = 0;
    this.curatorId = this.authService.getCurrentUser().uid;
    this.subscription = this.route.params.subscribe(
      (params:any) => {
        if(params.hasOwnProperty('id')){
          this.curationId = params['id'];
        }
      }
    );
  }

  uploadProductImages(event){
    let files = event.target.files;
    if(files)
    {
      this.ttlfiles = files.length;
      let storageRef = firebase.storage().ref('/Images/');
      for(let file of files){
        let task: firebase.storage.UploadTask = storageRef.child('product_images/'+file.name).put(file);
        task.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            this.productImagesProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            console.log(error);
          },
          () => {
            if(this.productImagesProgress >= 100)
              this.productImagesProgress = 0;
            console.log(task.snapshot.downloadURL);
            this.dataService.updateProductImageList(task.snapshot.downloadURL, this.curationId).subscribe(
              isPushed => {
                if(isPushed){
                  swal("Success", "successfully pushed the image", "success");
                }
              }
            );
          }
        );
      }
    }
  }

  uploadCoverImage(event){
    let file = event.target.files[0];
    if(file)
    {
      this.isCbuttonDisabled = true;
      let storageRef = firebase.storage().ref('/Images/');
      let updates = {};
      let task: firebase.storage.UploadTask = storageRef.child('product_images/'+file.name).put(file);
      task.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          this.coverImageProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          if(this.coverImageProgress >= 100)
            this.coverImageProgress = 0;
          updates['/curations/'+this.curationId+'/coverImage'] = task.snapshot.downloadURL;
          updates['/curators/'+this.curatorId+'/curations/'+this.curationId+'/coverImage'] = task.snapshot.downloadURL;
          this.dataService.createCuration(updates).subscribe(
            isUpdated => {
              if(isUpdated){
                swal("Success", "Cover Image Uploaded Successfully", "success");
              }
              this.isCbuttonDisabled = false;
            }
          );
        }
      );
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
