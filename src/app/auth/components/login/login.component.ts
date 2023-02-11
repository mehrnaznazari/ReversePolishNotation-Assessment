import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastifyService} from "../../../shared/services/toastify.service";
import {ValidatorsService} from "../../../shared/services/validators.service";
import {TokenService} from "../../../shared/services/token.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    loginWithUsernameForm!: FormGroup;

    constructor(private formBuilder: FormBuilder,
                public authService: AuthService,
                private tokenService: TokenService,
                private toastifyService: ToastifyService,
                private router: Router,
                private validatorsService: ValidatorsService) {
        this.loginWithUsernameForm = this.formBuilder.group({
            username: new FormControl('', [this.validatorsService.required(), this.validatorsService.minLength(5)]),
            password: new FormControl('', [this.validatorsService.required(), this.validatorsService.minLength(5)])
        });
    }

    ngOnInit(): void {
    }

    credentialHandler() {
        if (this.loginWithUsernameForm.valid) {
            if (this.loginWithUsernameForm.get('username').value === this.authService.username &&
                this.loginWithUsernameForm.get('password').value === this.authService.password) {
                this.tokenService.setAccessToken('token');
                this.router.navigate(['']).then();
            } else {
                this.toastifyService.error('The user name or password is incorrect');
            }
        }
    }

}
