import { Component, OnInit } from '@angular/core';
import {CollectionFormService} from "./collection-form.service";

@Component({
  selector: 'cp-new-collection-home',
  templateUrl: './new-collection-home.component.html',
  styles: [],
  providers: [CollectionFormService]
})
export class NewCollectionHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
