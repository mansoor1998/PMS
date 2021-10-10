import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Framework} from '../framework';

@Injectable({ providedIn: 'root' })
export class AuthRouteGuard implements CanActivate, CanActivateChild{

  constructor(private router: Router, private framework: Framework) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const session = this.framework.session;
    // if the user does not exist and he links to login then let him in.
    if (state.url === '/account/login' && (session.UserId == null || session.UserId === 0)){
      return true;
    }
    // if the session does not exist.
    if (session.UserId == null || session.UserId === 0) {
      this.router.navigate(['/account/login']);
      return false;
    }
    // if the session exist but the user goes to the login page.
    else if (state.url === '/account/login' && session.UserId != null && session.UserId !== 0){
      this.router.navigate(['/app/home']);
      return false;
    }

    // if the route requires a role and it does not exist than redirect to /app/home
    if ( route?.data?.role != null && !this.framework.session.isGranted(route?.data?.role) ){
      this.router.navigate(['/app/home']);
      return false;
    }

    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }

}
