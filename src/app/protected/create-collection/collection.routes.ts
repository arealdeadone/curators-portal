import {Routes} from "@angular/router";
import {CurationDetailsComponent} from "./curation-details.component";
import {ProductDetailsComponent} from "./product-details.component";
/**
 * Created by ARVIND on 3/13/2017.
 */

export const COLLECTION_ROUTES : Routes = [
  {path: '', component: CurationDetailsComponent},
  {path: ':id', component: ProductDetailsComponent},
  {path: '**', redirectTo: ''}
];
