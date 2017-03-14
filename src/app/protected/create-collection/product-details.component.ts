import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import * as firebase from 'firebase';
import {CollectionFormService} from "./collection-form.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

declare var swal;

@Component({
  selector: 'cp-product-details',
  templateUrl: './product-details.component.html',
  styles: [
    `
.full-width
{
  width: 100%;
}

sup{
    font-size: 1.5em;
  }
`
  ]
})
export class ProductDetailsComponent implements OnInit {

  productForm:FormGroup;
  file:any;
  fileLocalRef:any;
  fileUrl:any;
  progress:any;
  filePath:any;
  constructor(private _fs: CollectionFormService,
              private formBuilder:FormBuilder,
              private sanitizer:DomSanitizer,
              private router:Router,
              private location: Location
  ) {
    const config = {
      apiKey: "AIzaSyCcs4bYrNVSzwWxR7puCL3onX4CcnxYiTo",
      authDomain: "curator-portal.firebaseapp.com",
      databaseURL: "https://curator-portal.firebaseio.com",
      storageBucket: "curator-portal.appspot.com",
      messagingSenderId: "84592978554"
    };
    try{
      firebase.initializeApp(config);
    }
    catch (e){
      if(e.code != 'app/duplicate-app')
        alert(e.message);
    }
  }

  ngOnInit() {
    if(!this._fs.getCuration()){
      swal("Error", "Please enter collection details before proceeding", "error");
      this.router.navigate(['/profile','new']);
    }
    this.productForm = this.formBuilder.group({
      'productTitle': ['', [Validators.required]],
      'productDescription': ['', [Validators.required]],
      'productPrice': ['', [Validators.required]],
      'productShipping': ['Local', [Validators.required]]
    });
    console.log(this._fs.getCuration());
  }

  showPreview(event){
    this.file = event.target.files[0];
    this.fileLocalRef = URL.createObjectURL(this.file);
    this.fileLocalRef = this.sanitizer.bypassSecurityTrustUrl(this.fileLocalRef);
  }

  addProduct(){
    let data = {};
    data['productTitle'] = this.productForm.controls['productTitle'].value;
    data['productImage'] = this.fileUrl;
    data['productDescription'] = this.productForm.controls['productDescription'].value;
    data['productPrice'] = this.productForm.controls['productPrice'].value;
    data['productShipping'] = this.productForm.controls['productShipping'].value;

    this._fs.AddProducts(data);
    swal("Success", "Product Added Successfully", "success");
    this.productForm.reset();
  }

  uploadToFirebase(){
    this.progress = '0';
    console.log(this._fs.getCuration().curatorId);
    this.filePath = this._fs.getCuration().curatorId + '/' + this._fs.getCurationId() + '/' + this._fs.getProducts().length + '.';
    console.log(this.filePath);
    let possext = ['jpg','jpeg','png','bmp','gif'];
    let ext = this.file.name.split('.').pop().toLowerCase();
    if(this.file && possext.indexOf(ext) != -1){
      const storageRef = firebase.storage().ref('public');
      let uploadTask: firebase.storage.UploadTask = storageRef.child('images/'+this.filePath+ext).put(this.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          this.progress = ((snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(2);
        },
        (error) => console.log(error),
        () => {
          firebase.storage().ref('public').child('images/'+this.filePath+ext).getDownloadURL().then(
            url => {
              if(url) {
                this.fileUrl = url;
                swal("Uploaded", "The file has been uploaded successfully", "success");
              }
            }
          );
        }
      )
    }
  }

  storeCollection(){
    this._fs.CreateCollection().subscribe(
      isCreated => {
        if(isCreated)
        {
          swal("Success", "Product created successfully", "success");
          this.router.navigate(['/profile', 'dashboard']);
        }
        else
          swal("Error", "Sorry Some error occured", "error");
      }
    );
  }

  isImageUploaded(){
    return this.fileUrl == null;
  }

  goBack(){
    this.location.back();
  }
}
