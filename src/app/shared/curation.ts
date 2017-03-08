/*
* Data model for storing the curations created by a curator.
* The various attributes are pretty much self explanatory
* The curation is the set of Apparel that the curator creates which has
* various clothes for the upper part and the lower part of the body including
* accessories like bracelets, hats, shoes etc.
* */
import {ArrayObject} from "./array-object";
export class Curation {
  constructor(
    public curatorId:string,
    public curationId:number,
    public coverImage:string,
    public curationTitle: string,
    public curationDescription: string,
    public productImages: any,
    public ptags: any,
    public price: number,
    public shippingAvailibity: string,
    public discount: number,
    public storeLocation: string,
    public curationLikes: number,
    public isActive:boolean
  ){}
}
