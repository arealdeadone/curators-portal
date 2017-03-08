/**
 * Created by ARVIND on 3/8/2017.
 */
import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CreateCollectionComponent} from "./create-collection/create-collection.component";
import {UploadImagesComponent} from "./create-collection/upload-images.component";

export const PROFILE_ROUTES:Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'new', component: CreateCollectionComponent},
  {path: ':id/upload', component: UploadImagesComponent}
];
