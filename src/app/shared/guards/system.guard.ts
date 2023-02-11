import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TokenService} from "../services/token.service";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SystemGuard implements CanActivate {

    constructor(private router: Router,
                private tokenService: TokenService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        if (this.tokenService.hasAccessToken()) {
            return true;
        } else {
            this.router.navigate(['auth']).then();
            return false;
        }
    }
}
