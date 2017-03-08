/*
* This is a model user for passing the data returned by the
* firebase auth services. This will be used as the type of the
* data for the generic type Subject in AuthService sometimes
* */

export class MetaData {
  constructor(public type:string, public code:string, public message:string){}
}
