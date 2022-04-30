import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay } from 'rxjs';
import { ITruckResponse } from 'src/app/models/trucks.model';

import {
  ILoginModel,
  IResponseModel,
  IUserInfo,
} from '../../models/auth.model';
import { App } from '../constants/app.contants';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private authSubject = new BehaviorSubject(false);

  constructor(private readonly httpClient: HttpClient) {
    this.authSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.authSubject.getValue();
  }

  setAuthState(value: boolean): void {
    this.authSubject.next(value);
  }

  login(credential: ILoginModel): Observable<IResponseModel> {
    return this.httpClient
      .post<IResponseModel>(
        'https://qa2.gim.com.bd/ejogajog/api/v1/auth/adminLogIn',
        credential
      )
      .pipe(
        shareReplay(1),
        map((user: IResponseModel) => {
          localStorage.setItem(App.loginUser, JSON.stringify(user?.data));
          this.authSubject.next(true);
          return user;
        })
      );
  }

  getTrucksInfo(): Observable<ITruckResponse> {
    return this.httpClient
      .get<ITruckResponse>(
        'https://qa2.gim.com.bd/ejogajogAdminAPI/api/v1/admin/master/truckstands'
      )
      .pipe(shareReplay(1));
  }

  logout(): void {
    localStorage.removeItem(App.loginUser);
    this.authSubject.next(false);
  }
}
