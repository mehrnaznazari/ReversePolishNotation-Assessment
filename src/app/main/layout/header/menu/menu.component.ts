import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MenuItemInterface} from '../model/menu-item.interface';
import {AuthService} from "../../../../auth/services/auth.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MenuComponent {

    menuItems: MenuItemInterface[] = [
        {
            title: 'Dashboard',
            link: 'dashboard',
            icon: 'icon-home1',
        },
    ];

    logOut = {
        title: 'SignOut',
        icon: 'icon-power-off'
    };

    constructor(public auth: AuthService) {
    }

}
