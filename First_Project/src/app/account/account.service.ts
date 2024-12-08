import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { map, of, ReplaySubject } from 'rxjs';
import { Login } from '../shared/models/account/Login';
import { Register } from '../shared/models/account/Register';
import { User } from '../shared/models/account/User';
import { Router } from '@angular/router';
import { ConfirmEmail } from '../shared/models/account/ConfirmEmail';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  refreshUser(jwt: string | null) {
    if (jwt == null) {
      this.userSource.next(null)
      return of(undefined);
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${jwt}`);
    return this.http.get<User>(`${environment.appUrl}/api/account/refresh-page`, { headers }).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
        }
      })
    )
  }
  login(model: Login) {
    return this.http.post<User>(`${environment.appUrl}/api/account/login`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
          return user;
        }
        return null;
      })
    );
  }

  logOut() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);
    this.router.navigateByUrl('/');
  }
  confirmEmail(model: ConfirmEmail) {
    return this.http.put(`${environment.appUrl}/api/account/confirm-email`, model);
  }
  register(model: Register) {
    return this.http.post(`${environment.appUrl}/api/account/register`, model);
  }
  resendEmailConfirmationLink(email: string) {
    return this.http.post(`${environment.appUrl}/api/account/resend-email-confirmation-link/${email}`, {});
  }

  forgotUsernameOrPassword(email: string) {
    return this.http.post(`${environment.appUrl}/api/account/forgot-username-or-password/${email}`, {});
  }

  setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user))
    this.userSource.next(user);
  }
  getJWT() {
    const key = localStorage.getItem(environment.userKey)
    if (key != null) {
      const user: User = JSON.parse(key);
      return user.jwt;
    } else {
      return null;
    }
  }


}
