import {Injectable} from '@angular/core';
import {TokenService} from "../../shared/services/token.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private $username = 'admin';
    private $password = 'admin';

    constructor(private tokenService: TokenService,
                private router: Router) {
    }

    get username(): string {
        return this.$username;
    }

    get password(): string {
        return this.$password;
    }

    logOut(): void {
        this.tokenService.removeAllToken();
        this.router.navigate(['auth']).then()
    }

}
