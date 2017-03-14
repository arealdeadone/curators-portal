import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'cp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  loadAPIs: Promise<any>;

  constructor(){}

  ngOnDestroy(){
    localStorage.removeItem("firebase:host:curator-portal.firebaseio.com");
  }

  ngOnInit(){
    this.loadAPIs = new Promise(
      (resolve) => {
        console.log('Loading Libraries');
        //this.loadLibraries();
      }
    );
  }

  loadLibraries(){
    let plugins: string [] = [
      'assets/plugins/jquery/jquery.min.js',
      'assets/plugins/bootstrap/js/bootstrap.js',
      "assets/plugins/jquery-slimscroll/jquery.slimscroll.js",
      "assets/plugins/node-waves/waves.js",
      "assets/plugins/jquery-countto/jquery.countTo.js",
      "assets/plugins/jquery-steps/jquery.steps.js",
      "assets/plugins/sweetalert/sweetalert.min.js"
    ];
    for(let plugin of plugins){
      let node = document.createElement('script');
      node.src = plugin;
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }
}
