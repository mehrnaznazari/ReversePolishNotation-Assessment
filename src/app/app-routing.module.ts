import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./auth/guards/auth.guard";
import {SystemGuard} from "./shared/guards/system.guard";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main/main.module').then(m => m.MainModule),
        canActivate: [SystemGuard],
    },
    {
        path: 'auth',
        canActivate: [AuthGuard],
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
