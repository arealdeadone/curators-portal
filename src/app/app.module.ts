import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './protected/header/header.component';
import { SigninComponent } from './unprotected/signin/signin.component';
import {AuthService} from "./shared/auth.service";
import {routing} from "./app.router";
import { SignupComponent } from './unprotected/signup/signup.component';
import {AuthGuard} from "./shared/auth.guard";
import {DataService} from "./shared/data.service";
import { DashboardComponent } from './protected/curator-profile/dashboard/dashboard.component';
import { CuratorProfileHomeComponent } from './protected/curator-profile/curator-profile-home.component';
import { KeysPipe } from './shared/keys.pipe';
import { NewCollectionHomeComponent } from './protected/create-collection/new-collection-home.component';
import { CurationDetailsComponent } from './protected/create-collection/curation-details.component';
import {MaterialModule} from "@angular/material";
import { ProductDetailsComponent } from './protected/create-collection/product-details.component';
import 'hammerjs';
import { ViewCollectionComponent } from './protected/view-collection/view-collection.component';
import { ComponentListComponent } from './protected/component-list/component-list.component';
import { CollectionListComponent } from './protected/view-collection/collection-list/collection-list.component';
//import {SelectModule} from "ng2-select";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    CuratorProfileHomeComponent,
    KeysPipe,
    NewCollectionHomeComponent,
    CurationDetailsComponent,
    ProductDetailsComponent,
    ViewCollectionComponent,
    ComponentListComponent,
    CollectionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
