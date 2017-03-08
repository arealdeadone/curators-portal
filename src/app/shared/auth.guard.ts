import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
/**
 * Created by ARVIND on 3/6/2017.
 */

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | boolean {
    this.authService.isAuthenticated().first().subscribe(
      authState => {
        if(authState)
          return true;
        else
        {
          this.router.navigate(['']);
          return false;
        }
      }
    );
    return this.authService.isAuthenticated().first();
  }
}
