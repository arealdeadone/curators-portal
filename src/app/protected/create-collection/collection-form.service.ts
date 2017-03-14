import { Injectable } from '@angular/core';
import {Curation} from "../../shared/curation";
import {DataService} from "../../shared/data.service";
import {Product} from "../../shared/product";


@Injectable()
export class CollectionFormService {

  public static curation:Curation;
  public static curationId:any;
  public static products:Product[]=[];
  constructor(private dataService:DataService) {
    if(!CollectionFormService.curationId)
      CollectionFormService.curationId = this.dataService.getUniqueKey('curations');
    console.log(CollectionFormService.curationId);
  }

  getCuration(){
    return CollectionFormService.curation;
  }

  getCurationId(){
    return CollectionFormService.curationId;
  }

  getProducts(){
    return CollectionFormService.products;
  }

  CollectionGeneralDetails(data:any){
      console.log(data);
      if(!CollectionFormService.curation){
        CollectionFormService.curation = new Curation(
          data.curatorId,
          CollectionFormService.curationId,
          data.curationTitle,
          data.curationCoverImage,
          data.curationDescription,
          [],
          data.curationStoreLocation,
          data.curationCity,
          data.curationState,
          0,
          true
        );
      }
      else {
        for(let prop in data){
          if(CollectionFormService.curation.hasOwnProperty(prop))
            CollectionFormService.curation[prop] = data[prop];
        }
      }
  }

  AddProducts(data:any){
    let newProd = new Product(
      data.productTitle,
      data.productDescription,
      data.productImage,
      data.productPrice,
      data.productShipping,
      [],
      0
    );
    CollectionFormService.products.push(newProd);
  }

  CreateCollection(){
    CollectionFormService.curation.curationProducts = CollectionFormService.products;
    let updates = {};
    updates['/curations/'+CollectionFormService.curationId] = CollectionFormService.curation;
    updates['/curators/'+CollectionFormService.curation.curatorId+'/curations/'+CollectionFormService.curationId] = CollectionFormService.curation;
    return this.dataService.createCuration(updates);
  }
}
