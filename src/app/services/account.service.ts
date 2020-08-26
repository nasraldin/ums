import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private loginUrl = environment.loginUrl;
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('accessToken')),
    );
    this.user = this.userSubject.asObservable();
  }

  public set setUserInfo(user: any) {
    this.userSubject = new BehaviorSubject<User>(user);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  public get username(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.username;
    }
    return '';
  }

  public get accessToken(): string {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    let accessToken = '';
    if (token) {
      accessToken = token.accessToken;
    }
    return accessToken;
  }

  login(email: string, password: string) {
    return this.http
      .post<User>(`${this.loginUrl}`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('accessToken', JSON.stringify(user));
          const token = user as any;
          const userToken = this.parseJwt(token.accessToken);
          localStorage.setItem('sub', JSON.stringify(userToken.sub));
          this.userSubject.next(user);
          return user;
        }),
      );
  }

  logout() {
    localStorage.removeItem('sub');
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
  }

  parseJwt(token: any) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}
