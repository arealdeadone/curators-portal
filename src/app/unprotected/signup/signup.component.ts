import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Curator} from "../../shared/curator";
import {Curation} from "../../shared/curation";
import {Subscription} from "rxjs";
import {MetaData} from "../../shared/meta-data";
import {DataService} from "../../shared/data.service";
import {Router} from "@angular/router";

declare var swal;

@Component({
  selector: 'cp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private fb:  FormBuilder, private authService: AuthService, private dataService: DataService, private router:Router) { }
  buttonText = 'SIGN UP';
  buttonDisabled = false;
  signUpForm:FormGroup;
  userData:Curator;
  subscription:Subscription;
  onSignUp(){
    this.buttonText = 'PLEASE WAIT';
    this.buttonDisabled = true;
    this.userData = new Curator(
      this.signUpForm.controls['namesurname'].value,
      this.signUpForm.controls['email'].value,
      '', 0, 0, 0);
    this.subscription = this.authService.
    signupUser(this.signUpForm.controls['email'].value, this.signUpForm.controls['password'].value)
      .subscribe(
        (authMetaData: MetaData) => {
          if(authMetaData.type == 'error'){
            swal("Oops...",authMetaData.message, authMetaData.type);
            this.buttonText = 'SIGN UP';
            this.buttonDisabled = false;
            this.signUpForm.reset();
          }
          if(authMetaData.type == 'success'){
            swal("OK",authMetaData.message, authMetaData.type);
            this.buttonText = 'SIGN UP';
            this.buttonDisabled =  false;
            this.signUpForm.reset();
            this.dataService.storeUserData(this.userData).subscribe(
              canNavigate => {
                if(canNavigate)
                  this.router.navigate(['/signin']);
                else
                  swal("Oops...","Something went wrong", "error");
              }
            );
          }
        }
      );
  }
  ngOnInit() {
    this.authService.isAuthenticated().first().subscribe(
      authState => {
        if(authState)
          this.router.navigate(['/profile']);
      }
    );
    this.userData = new Curator('','','', 0, 0, 0);
    this.buttonDisabled = false;
    this.signUpForm = this.fb.group({
      namesurname : [Validators.required],
      email: [Validators.required, Validators.pattern],
      password: [Validators.required]
    });
  }

  ngOnDestroy(){
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
