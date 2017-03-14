import {Curation} from "./curation";
/*
* This model ment to store data about the curator
* All the fields are pretty much self explanatory
* A curator can have more than one curation(ofc) the parameter curations
* is of type string[] which contains the id's of all the curations of the curator
* */
export class Curator {
  constructor(
    public name:string,
    public email: string,
    public contactNumber: string,
    public ordersCompleted: number,
    public ordersPending: number,
    public revenueGenertated: number,
    public curations:Curation[] = null
  ){}
}
