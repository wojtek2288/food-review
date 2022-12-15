import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { tap, map } from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isUserLoggedIn$.pipe(
      tap(x => {
        if (x) {
          this.router.navigate(['/restaurants']);
        }
      }), map(x => !x));
  }
}
