import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from "../../shared/services/token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private tokenService: TokenService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.tokenService.hasAccessToken()) {
            this.router.navigate(['dashboard']).then();
            return false;
        } else {
            return true;
        }
    }

}
