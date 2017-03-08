import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { CreateCollectionComponent } from './protected/curator-profile/create-collection/create-collection.component';
import { UploadImagesComponent } from './protected/curator-profile/create-collection/upload-images.component';
import { KeysPipe } from './shared/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    CuratorProfileHomeComponent,
    CreateCollectionComponent,
    UploadImagesComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [AuthService, DataService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
