import { App } from './core/constants/app.contants';
import { CoreService } from './core/services/core.service';
import { Component } from '@angular/core';
import { IUserInfo } from './models/auth.model';

@Component({
  selector: 'gim-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly coreService: CoreService) {
    const userData = localStorage.getItem(App.loginUser);
    if (userData) {
      const user = JSON.parse(userData) as IUserInfo;
      this.coreService.setAuthState(user?.token ? true : false);
    }
  }
}
