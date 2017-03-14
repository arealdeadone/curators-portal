/**
 * Created by ARVIND on 3/8/2017.
 */
import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NewCollectionHomeComponent} from "../create-collection/new-collection-home.component";
import {COLLECTION_ROUTES} from "../create-collection/collection.routes";

export const PROFILE_ROUTES:Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'new', component: NewCollectionHomeComponent, children:COLLECTION_ROUTES},
  {path: '**', redirectTo: 'dashboard'}
  //{path: ':id/upload', component: UploadImagesComponent}
];
