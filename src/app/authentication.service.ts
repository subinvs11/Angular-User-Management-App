import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiDomain = 'http://35.200.169.173/api/';

  constructor(private http: HttpClient,
    private localStorage: LocalStorage) { }

  /**
   * Authenticates user
   * @param loginData User authentication data
   */
  authenticateUser(loginData) {
    console.log(loginData);//zzz
    
    return this.http.post(this.apiDomain + 'login/', loginData).pipe(
      map(
        (response: { status: boolean, token: string }) => {
          // Gets login response and stores access token in local storage
          if (response && response.hasOwnProperty('token')) {
            this.localStorage.setItemSubscribe(
              'access_token',
              response.token
            );

            this.localStorage.setItemSubscribe(
              'is_authenticated',
              true
            );
            
          }
          return response;
        }
      )
    );
  }

  private isAuthenticated;
  private accessToken;
  getLoginStatus() {
    this.isAuthenticated = this.localStorage.getItem('is_authenticated');
    return this.isAuthenticated;
  }



}
