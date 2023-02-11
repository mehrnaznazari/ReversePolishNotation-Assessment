import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './components/login/login.component';
import {ErrorModule} from "../shared/components/error/error.module";
import {FormErrorDirective} from "../shared/directives/form-error.directive";

@NgModule({
  declarations: [
    LoginComponent,
    FormErrorDirective
  ],
  exports: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorModule,
  ]
})
export class AuthModule {
}
