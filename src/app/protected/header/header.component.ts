import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";
import {DataService} from "../../shared/data.service";
import {Curator} from "../../shared/curator";
import {Subscription} from "rxjs";

@Component({
  selector: 'cp-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isOpenSearch = false;
  userData:Curator;
  private subscription:Subscription;
  constructor(private authService:AuthService, private router: Router, private dataService:DataService) { }
  toggleSearchBar(){
    this.isOpenSearch =   !this.isOpenSearch;
  }
  ngOnInit() {
    // this.subscription = this.dataService.getUserData().subscribe(
    //   (data:Curator) => this.userData = data
    // );
    this.userData = this.dataService.getUserDataOffline();
    if(!this.userData)
      this.subscription = this.dataService.getCurator.subscribe(
        event => this.userData = event
      )
  }

  signOut(){
    this.authService.signOutUser();
    this.router.navigate(['']);
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
