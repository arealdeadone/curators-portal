/**
 * Created by ARVIND on 3/6/2017.
 */
import {Routes, RouterModule} from "@angular/router";
import {SigninComponent} from "./unprotected/signin/signin.component";
import {SignupComponent} from "./unprotected/signup/signup.component";
import {CuratorProfileHomeComponent} from "./protected/curator-profile/curator-profile-home.component";
import {AuthGuard} from "./shared/auth.guard";
import {PROFILE_ROUTES} from "./protected/curator-profile/profile.routes";

const APP_ROUTES : Routes = [
  {path: '', redirectTo: '/signup', pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: CuratorProfileHomeComponent, children: PROFILE_ROUTES, canActivate: [AuthGuard]}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
