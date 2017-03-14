export class Product {
  constructor(
    public productTitle:string,
    public productDescription:string,
    public productImage:string,
    public productPrice:number,
    public productShipping:string,
    public productTags:any,
    public productLikes:number
  ){}
}
