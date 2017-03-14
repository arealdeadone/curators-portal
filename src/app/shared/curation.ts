/*
* Data model for storing the curations created by a curator.
* The various attributes are pretty much self explanatory
* The curation is the set of Apparel that the curator creates which has
* various clothes for the upper part and the lower part of the body including
* accessories like bracelets, hats, shoes etc.
* */

import {Product} from "./product";
export class Curation {
  constructor(
    public curatorId:string,
    public curationId:string,
    public curationTitle: string,
    public curationCoverImage:string,
    public curationDescription: string,
    public curationProducts: Product[],
    public curationStoreLocation: string,
    public curationCity:string,
    public curationState:string,
    public curationLikes: number,
    public curationIsActive:boolean
  ){}
}
