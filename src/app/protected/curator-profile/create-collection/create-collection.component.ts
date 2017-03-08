import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Curation} from "../../../shared/curation";
import {DataService} from "../../../shared/data.service";
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";
import {ArrayObject} from "../../../shared/array-object";


declare var swal;
declare var CryptoJS;

@Component({
  selector: 'cp-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit{

  constructor(private dataService:DataService, private authService: AuthService, private router:  Router) { }
  curation:Curation;
  curatorId:string;
  buttonActive = true;
  onSubmit(f:NgForm){
    console.log(f);
    swal("Please Wait", "Please Wait while your collection is being created", "warning");
    this.buttonActive = false;
    const collectionId = this.dataService.getUniqueKey('curations');
    this.curation = new Curation(
        this.curatorId,
        collectionId,
        '',
        f.value.title,
        f.value.description,
        [],
        [],
        f.value.price,
        f.value.shippingAvailability,
        f.value.discount,
        f.value.storeAddress,
        0,
        false
    );
    f.reset();
    let updates = {};
    updates['/curations/'+collectionId] = this.curation;
    updates['/curators/'+this.curatorId+'/curations/'+collectionId] = this.curation;
    console.log(updates);
    this.dataService.createCuration(updates).subscribe(
      isCreated => {
        if(isCreated){
          swal({
            title: "Collection Created but not active",
            text: "Upload the product images and collection cover for your Collection to be active",
            type: "warning",
            animation: "slide-from-bottom"
          });
          this.router.navigate(['/profile', collectionId,'upload']);
        }
        else {
          swal("Oops...", "Some error occured", "Please try again");
        }
      }
    )
  }
   ngOnInit(){
    this.curatorId = this.authService.getCurrentUser().uid;
   }

   log(a:any){
     console.log(a.valid);
   }
}
