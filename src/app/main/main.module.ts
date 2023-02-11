import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {MainRoutingModule} from './main-routing.module';
import {CommonModule} from "@angular/common";
import {MainComponent} from "./main.component";
import {HeaderComponent} from "./layout/header/header.component";
import {MenuComponent} from "./layout/header/menu/menu.component";
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MainModule {
}
