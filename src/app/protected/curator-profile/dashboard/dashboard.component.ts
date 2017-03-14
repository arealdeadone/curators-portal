import {Component, OnInit, OnDestroy} from '@angular/core';
import {Curator} from "../../../shared/curator";
import {DataService} from "../../../shared/data.service";
import {Subscription} from "rxjs";

declare var $;

@Component({
  selector: 'cp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  user:Curator;
  subscription:Subscription;
  curationNo;
  constructor(private dataService:DataService) {

  }

  refreshData(){
    this.subscription = this.dataService.getUserData().subscribe(
      (userData:Curator)  => {
        this.user = userData;
        this.curationNo = Object.keys(this.user.curations).length;
        console.log(this.curationNo);

      }
    );
  }

  ngOnInit() {
    this.user = this.dataService.getUserDataOffline();
    if(!this.user)
    {
      this.subscription = this.dataService.getCurator.subscribe(
        event => {
          this.user = event;
          console.log(this.user.curations);
          this.curationNo = Object.keys(this.user.curations).length;
        }
      )
    } else
      this.curationNo = Object.keys(this.user.curations).length;
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
