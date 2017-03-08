import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {Subscription} from "rxjs";
import {MetaData} from "../../shared/meta-data";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'cp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnDestroy, OnInit {

  buttonText = 'SIGN IN';
  private subscription:Subscription = null;
  constructor(private authService:AuthService, private router: Router) { }


  onSubmit(form: NgForm){
    this.buttonText = 'PLEASE WAIT';
    this.subscription = this.authService.signinUser(form.value.email, form.value.password).subscribe(
      (metadata:MetaData) => {
        if(metadata.type == 'error'){
          alert(metadata.message);
          this.buttonText = 'SIGN IN';
          form.resetForm();
        }
        if(metadata.type='success'){
          this.router.navigate(['/profile']);
          this.buttonText = 'SIGN IN';
          form.resetForm();
        }
    }
    );
  }

  ngOnInit(){
    this.authService.isAuthenticated().first().subscribe(
      authState => {
        if(authState)
          this.router.navigate(['/profile']);
      }
    );
  }

  ngOnDestroy(){
    if(this.subscription != null)
      this.subscription.unsubscribe();
  }

}
